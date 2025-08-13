import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { PersonaDto, PersonaCreateDto, PersonaUpdateDto } from "../../models";
import { InformacionPersonalService } from "../../services";
import { NotificationService } from "../../../../core/services";
import { AuthService } from "../../../../core/auth/auth.service";
import { Store } from "@ngrx/store";
import { HojavidaActions, selectPersona } from "../../store";
import { take } from "rxjs/operators";

@Component({
  selector: "app-info-personal",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: "./info-personal.component.html",
  styleUrl: "./info-personal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPersonalComponent implements OnInit {
  personaForm!: FormGroup;
  isLoading = false;
  get isEditMode() {
    return this.personaId !== undefined;
  }
  personaId?: number;

  private readonly fb = inject(FormBuilder);
  private readonly informacionPersonalService = inject(
    InformacionPersonalService
  );
  private readonly notificationService = inject(NotificationService);
  private readonly auth = inject(AuthService);
  private readonly store = inject(Store);

  ngOnInit(): void {
    // Primero construimos el formulario para garantizar que exista antes de patchValue
    this.buildForm();
    this.personaId = this.auth.session?.user.user_metadata.idPersona;
    if (this.personaId) {
      // Intentar obtener desde store primero
      this.store.select(selectPersona).subscribe((p) => {
        console.log(p);
        this.personaForm.patchValue(p);
      });
    }
  }

  private buildForm(): void {
    this.personaForm = this.fb.group({
      // Información personal básica
      primerNombre: ["", [Validators.required, Validators.maxLength(255)]],
      segundoNombre: ["", [Validators.maxLength(255)]],
      primerApellido: ["", [Validators.required, Validators.maxLength(255)]],
      segundoApellido: ["", [Validators.maxLength(255)]],

      // Documento
      idTipoDocumento: [null, [Validators.required]],
      numeroDocumento: [
        {
          value: this.auth.session?.user.user_metadata.numeroDocumento,
          disabled: true,
        },
        [Validators.required, Validators.maxLength(128)],
      ],
      fechaExpedicionDoc: ["", [Validators.required]],

      // Información personal
      fechaNacimiento: ["", [Validators.required]],
      lugarNacimiento: ["", [Validators.required, Validators.maxLength(255)]],
      departamentoResidencia: [
        "",
        [Validators.required, Validators.maxLength(255)],
      ],
      ciudadResidencia: ["", [Validators.required, Validators.maxLength(255)]],
      direccionResidencia: [
        "",
        [Validators.required, Validators.maxLength(255)],
      ],

      // Contacto
      telefono: [
        "",
        [
          Validators.required,
          Validators.maxLength(63),
          Validators.pattern(/^\d{10}$/),
        ],
      ],
      correo: [
        { value: this.auth.session?.user.email, disabled: true },
        [Validators.required, Validators.email, Validators.maxLength(127)],
      ],

      // Información adicional
      idGenero: [null, [Validators.required]],
      idEnfoqueDiferencial: [null, [Validators.required]],

      // informacion de Contacto adicional
      nombreContacto: ["", [Validators.required, Validators.maxLength(255)]],
      telefonoContacto: [
        "",
        [
          Validators.required,
          Validators.maxLength(63),
          Validators.pattern(/^\d{10}$/),
        ],
      ],
      correoContacto: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(127)],
      ],
    });
  }

  onSubmit(): void {
    this.personaForm.markAllAsTouched();
    if (this.personaForm.valid) {
      this.isLoading = true;

      if (this.isEditMode) {
        this.actualizarPersona();
      } else {
        this.crearPersona();
      }
    } else {
      this.notificationService.showError(
        "Por favor, complete todos los campos requeridos correctamente."
      );
    }
  }

  /**
   * Crea una nueva persona
   */
  private crearPersona(): void {
    const formData: PersonaCreateDto = this.personaForm.getRawValue();

    this.informacionPersonalService
      .crearInformacionPersonal(formData)
      .subscribe({
        next: (persona: PersonaDto) => {
          console.log("Persona creada:", persona);
          this.personaId = persona.id;
          this.isLoading = false;
          this.notificationService.showSuccess(
            "Información personal guardada exitosamente."
          );
          this.store.dispatch(
            HojavidaActions.updatePersonaInState({ persona })
          );
        },
        error: (error) => {
          console.error("Error al crear persona:", error);
          this.isLoading = false;
          this.notificationService.showError(
            error.message || "Error al guardar la información personal."
          );
        },
      });
  }

  /**
   * Actualiza una persona existente
   */
  private actualizarPersona(): void {
    if (this.personaId == null) {
      return;
    }
    const formData: PersonaUpdateDto = {
      id: this.personaId,
      ...this.personaForm.getRawValue(),
    };

    this.informacionPersonalService
      .actualizarInformacionPersonal(formData)
      .subscribe({
        next: (persona: PersonaDto) => {
          console.log("Persona actualizada:", persona);
          this.isLoading = false;
          this.notificationService.showSuccess(
            "Información personal actualizada exitosamente."
          );
          this.store.dispatch(
            HojavidaActions.updatePersonaInState({ persona })
          );
        },
        error: (error) => {
          console.error("Error al actualizar persona:", error);
          this.isLoading = false;
          this.notificationService.showError(
            error.message || "Error al actualizar la información personal."
          );
        },
      });
  }

  /**
   * Valida si un correo ya existe (para nuevo registro)
   */
  onCorreoChange(): void {
    const correoElectronico = this.control("correo")?.value;

    if (correoElectronico && !this.isEditMode) {
      this.informacionPersonalService
        .validarCorreoExistente(correoElectronico)
        .subscribe({
          next: (existe: boolean) => {
            if (existe) {
              this.control("correo")?.setErrors({ correoExistente: true });
              this.notificationService.showWarning(
                "Este correo electrónico ya está registrado."
              );
            }
          },
          error: (error) => {
            console.error("Error al validar correo:", error);
          },
        });
    }
  }

  // Getters para facilitar el acceso a los controles en el template
  control(name: string) {
    return this.personaForm.get(name);
  }
}
