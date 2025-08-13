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
  isEditMode = false;
  personaId?: number;

  private fb = inject(FormBuilder);
  private informacionPersonalService = inject(InformacionPersonalService);
  private notificationService = inject(NotificationService);
  private auth = inject(AuthService);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.personaForm = this.fb.group({
      // Información personal básica
      primerNombre: ["", [Validators.required, Validators.maxLength(255)]],
      segundoNombre: ["", [Validators.maxLength(255)]],
      primerApellido: ["", [Validators.required, Validators.maxLength(255)]],
      segundoApellido: ["", [Validators.maxLength(255)]],

      // Documento
      idTipoDocumento: ["", [Validators.required]],
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
      idGenero: ["", [Validators.required]],
      idEnfoqueDiferencial: ["", [Validators.required]],

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
    if (this.personaForm.valid) {
      this.isLoading = true;

      if (this.isEditMode && this.personaId) {
        this.actualizarPersona();
      } else {
        this.crearPersona();
      }
    } else {
      console.log("Form is invalid");
      this.personaForm.markAllAsTouched();
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
          this.isEditMode = true;
          this.isLoading = false;
          this.notificationService.showSuccess(
            "Información personal guardada exitosamente."
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
    const formData: PersonaUpdateDto = {
      id: this.personaId!,
      ...this.personaForm.value,
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
   * Carga la información de una persona por ID
   * @param id ID de la persona a cargar
   */
  cargarPersona(id: number): void {
    this.isLoading = true;

    this.informacionPersonalService.obtenerInformacionPersonal(id).subscribe({
      next: (persona: PersonaDto) => {
        this.personaForm.patchValue(persona);
        this.personaId = persona.id;
        this.isEditMode = true;
        this.isLoading = false;
        console.log("Persona cargada:", persona);
      },
      error: (error) => {
        console.error("Error al cargar persona:", error);
        this.isLoading = false;
        this.notificationService.showError(
          error.message || "Error al cargar la información personal."
        );
      },
    });
  }

  /**
   * Busca una persona por número de documento
   */
  buscarPorDocumento(): void {
    const numeroDocumento = this.control("numeroDocumento")?.value;

    if (!numeroDocumento) {
      this.notificationService.showWarning(
        "Por favor, ingrese un número de documento."
      );
      return;
    }

    this.isLoading = true;

    this.informacionPersonalService
      .buscarPorDocumento(numeroDocumento)
      .subscribe({
        next: (persona: PersonaDto) => {
          this.personaForm.patchValue(persona);
          this.personaId = persona.id;
          this.isEditMode = true;
          this.isLoading = false;
          this.notificationService.showSuccess(
            "Información personal encontrada y cargada."
          );
        },
        error: (error) => {
          console.error("Error al buscar persona:", error);
          this.isLoading = false;
          this.notificationService.showError(
            error.message || "No se encontró información para este documento."
          );
        },
      });
  }

  /**
   * Valida si un documento ya existe (para nuevo registro)
   */
  onDocumentoChange(): void {
    const numeroDocumento = this.control("numeroDocumento")?.value;

    if (numeroDocumento && !this.isEditMode) {
      this.informacionPersonalService
        .validarDocumentoExistente(numeroDocumento)
        .subscribe({
          next: (existe: boolean) => {
            if (existe) {
              this.control("numeroDocumento")?.setErrors({
                documentoExistente: true,
              });
              this.notificationService.showWarning(
                "Este número de documento ya está registrado."
              );
            }
          },
          error: (error) => {
            console.error("Error al validar documento:", error);
          },
        });
    }
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

  /**
   * Limpia el formulario para crear una nueva persona
   */
  nuevaPersona(): void {
    this.personaForm.reset();
    this.personaId = undefined;
    this.isEditMode = false;
    this.initializeForm();
  }

  // Getters para facilitar el acceso a los controles en el template
  control(name: string) {
    return this.personaForm.get(name);
  }
}
