import { Component, LOCALE_ID, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { AutocompleteSelectComponent } from "../../../../shared/components/autocomplete-select";
import {
  PersonaDto,
  PersonaCreateDto,
  PersonaUpdateDto,
  TipoDocumentoDto,
  GeneroDto,
  EnfoqueDiferencialDto,
} from "../../models";
import { InformacionPersonalService } from "../../services";
import { NotificationService } from "../../../../core/services";
import { AuthService } from "../../../../core/auth/auth.service";
import { Store } from "@ngrx/store";
import { HojavidaActions, selectPersona } from "../../store";
import moment from "moment";
import { EsCoDateAdapter } from "../../../../core/date/custom-date-adapter";
import { ES_CO_DATE_FORMATS } from "../../../../core/date/date-formats";

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
    AutocompleteSelectComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "es-CO" },
    {
      provide: DateAdapter,
      useClass: EsCoDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: ES_CO_DATE_FORMATS },
  ],
  templateUrl: "./info-personal.component.html",
  styleUrl: "./info-personal.component.scss",
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

  now = moment().toDate();

  busquedaTextDepartamento = "";
  textLugarNacimiento = "";

  tiposDocumento: TipoDocumentoDto[] = [];
  generos: GeneroDto[] = [];
  enfoques: EnfoqueDiferencialDto[] = [];

  ngOnInit(): void {
    // Primero construimos el formulario para garantizar que exista antes de patchValue
    this.buildForm();
    this.cargarCatalogos();
    this.personaId = this.auth.session?.user.user_metadata.idPersona;

    // Revalidar fecha de expedición cuando cambia la fecha de nacimiento (para el atributo [min])
    this.control("fechaNacimiento")?.valueChanges.subscribe(() => {
      const ctrlExp = this.control("fechaExpedicionDoc");
      // Si la expedición quedó por debajo del nuevo mínimo, la limpiamos para forzar selección válida
      const nacimientoVal = this.control("fechaNacimiento")?.value;
      if (
        nacimientoVal &&
        ctrlExp?.value &&
        new Date(ctrlExp.value) < new Date(nacimientoVal)
      ) {
        ctrlExp.markAsTouched();
      }
    });
    if (this.personaId) {
      // Intentar obtener desde store primero
      this.store.select(selectPersona).subscribe((p) => {
        this.personaForm.patchValue(p);
        //se debe llenar el campo autocompletado con la informacion que llega separada del backend
        if (p?.departamentoResidencia && p?.ciudadResidencia) {
          const nombreCompleto = `${p.departamentoResidencia}, ${p.ciudadResidencia}`;
          this.personaForm.patchValue({ lugarResidencia: nombreCompleto });
          this.busquedaTextDepartamento = nombreCompleto;
        }
        //se asigna el valor del campo ya llenado de lugar naciomiento, buscando entre todos los de la
        // DB por el municipio
        if (p?.lugarNacimiento) {
          this.fetchCiudadDepartamento(p.lugarNacimiento).subscribe((data) => {
            this.textLugarNacimiento = data[0]?.nombreCompleto || "";
          });
        }
      });
    }
  }

  private cargarCatalogos(): void {
    this.informacionPersonalService
      .obtenerTiposDocumento()
      .subscribe((list) => (this.tiposDocumento = list || []));
    this.informacionPersonalService
      .obtenerGeneros()
      .subscribe((list) => (this.generos = list || []));
    this.informacionPersonalService
      .obtenerEnfoquesDiferenciales()
      .subscribe((list) => (this.enfoques = list || []));
  }

  private buildForm(): void {
    const namePattern = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/u; // solo letras, espacios, apóstrofe y guion

    this.personaForm = this.fb.group({
      // Información personal básica
      primerNombre: [
        "",
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(namePattern),
        ],
      ],
      segundoNombre: [
        "",
        [Validators.maxLength(255), Validators.pattern(namePattern)],
      ],
      primerApellido: [
        "",
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(namePattern),
        ],
      ],
      segundoApellido: [
        "",
        [Validators.maxLength(255), Validators.pattern(namePattern)],
      ],

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
      lugarResidencia: ["", [Validators.required, Validators.maxLength(512)]], //para completar los campos de departamento y ciudad
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
      nombreContacto: [
        "",
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(namePattern),
        ],
      ],
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

  fetchCiudadDepartamento = (text: string): Observable<any[]> => {
    return this.informacionPersonalService.buscarDepartamentosMunicipios(text);
  };

  onLugarResidenciaSelected(opt: any) {
    if (!opt) return;
    this.personaForm.patchValue({
      departamentoResidencia: opt.departamento || "",
      ciudadResidencia: opt.municipio || "",
    });
  }

  onLugarNacimientoSelected(opt: any) {
    if (!opt) return;
    this.control("lugarNacimiento").setValue(opt.municipio);
  }

  onSubmit(): void {
    this.personaForm.markAllAsTouched();
    if (this.personaForm.valid) {
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
          this.personaId = persona.id;
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
    return this.personaForm.get(name) as FormControl;
  }

  onDigitInput(controlName: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const soloDigitos = input.value.replace(/\D+/g, "");
    if (input.value !== soloDigitos) {
      input.value = soloDigitos;
    }
    this.control(controlName).setValue(soloDigitos);
  }

  onNameInput(controlName: string, event: Event) {
    const input = event.target as HTMLInputElement;
    // Eliminamos dígitos inmediatamente para mejor UX
    const limpio = input.value.replace(/\d+/g, "");
    if (limpio !== input.value) {
      input.value = limpio;
      this.control(controlName).setValue(limpio);
    }
  }
}
