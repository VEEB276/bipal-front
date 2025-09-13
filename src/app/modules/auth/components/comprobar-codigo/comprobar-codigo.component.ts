import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "../../../../core/auth/auth.service";
import { ContainerAuthComponent } from "../container-auth/container-auth.component";

@Component({
  selector: "app-comprobar-codigo",
  imports: [
    MatCard,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ContainerAuthComponent,
  ],
  templateUrl: "./comprobar-codigo.component.html",
  styleUrl: "./comprobar-codigo.component.scss",
})
export class ComprobarCodigoComponent {
  email = input<string>("");

  @Input() origin: "reset" | "create" = "create";
  // form:FormControl=new form
  formCode: FormGroup;
  // Estado derivado para mensajes y navegación
  currentOrigin: "reset" | "create" = "create";
  emailText = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authServ: AuthService
  ) {
    this.formCode = this.fb.group({
      digitsGroup: this.fb.array([
        this.fb.control("", [Validators.required, Validators.pattern(/^\d$/)]),
        this.fb.control("", [Validators.required, Validators.pattern(/^\d$/)]),
        new FormControl("", [Validators.required, Validators.pattern(/^\d$/)]),
        new FormControl("", [Validators.required, Validators.pattern(/^\d$/)]),
        new FormControl("", [Validators.required, Validators.pattern(/^\d$/)]),
        new FormControl("", [Validators.required, Validators.pattern(/^\d$/)]),
      ]),
    });

    // Inicializar origen y email desde query params (fallback al input())
    const qp = this.route.snapshot.queryParamMap;
    this.currentOrigin =
      (qp.get("origin") as "reset" | "create") ?? this.origin;
    this.emailText = qp.get("email") ?? this.email();
  }
  //este get accede a la informacion del controler digitGroup del formulario formcode
  get digitGroup(): FormArray {
    return this.formCode.get("digitsGroup") as FormArray;
  }
  verificarCodigo() {
    if (this.formCode.valid) {
      /**si las casillas no infringieron ningun validador, entonces se procede a concatenar los digitos ingresaados
      e igualarlos a la variable codigoIngresadoH*/
      const codigoIngresadoH = this.digitGroup.value.join("");
      console.log("el codigo ingresado es: ", codigoIngresadoH, "?");
      //------------------------------- subscripcion a los parametros de la direccion ----------------------------------
      const originParam = this.currentOrigin;
      const email = this.emailText;

      if (originParam === "reset") {
        // Verificación de código de recuperación
        this.authServ
          .verifyRecoveryCode(email, codigoIngresadoH)
          .then((res) => {
            if (res.error || !res.verified) return;
            this.router.navigate(["/auth/reset-password"], {
              queryParams: { email },
            });
          });
      } else {
        // Verificación de código de onboarding/crear usuario
        this.authServ
          .verifyEmailCode(email, codigoIngresadoH)
          .then((response) => {
            if (response.error) {
              console.error(
                "Error al verificar el código:",
                response.error.message
              );
              return;
            }
            this.router.navigate(["/auth/crear-clave"], {
              queryParams: { email },
            });
          });
      }
    }
  }

  // Copys dinámicos
  get heading(): string {
    return this.currentOrigin === "reset"
      ? "Código de recuperación"
      : "Código de verificación";
  }

  get description(): string {
    const email = this.emailText;
    return this.currentOrigin === "reset"
      ? `Si el correo está asociado a un usuario, ingresa el código de recuperación que enviamos a <strong>${email}</strong> para restablecer su contraseña.`
      : `Ingresa el código de verificación que enviamos a tu <strong>${email}</strong> para continuar con el registro.`;
  }

  toFormControl(item: any) {
    return item as FormControl;
  }

  /**
   * Maneja el cambio de input para auto-avanzar al siguiente campo
   * @param event - Evento del input
   * @param index - Índice del input actual
   */
  onInputChange(event: any, index: number): void {
    const value = event.target.value;

    // Solo permitir números
    if (value && !/^\d$/.test(value)) {
      event.target.value = "";
      this.digitGroup.controls[index].setValue("");
      return;
    }

    // Si hay un valor y no es el último input, avanzar al siguiente
    if (value && index < this.digitGroup.controls.length - 1) {
      this.focusNextInput(index + 1);
    }
  }
  /**
   * Maneja las teclas especiales como Backspace y flechas
   * @param event - Evento del teclado
   * @param index - Índice del input actual
   */
  onKeyDown(event: KeyboardEvent, index: number): void {
    // Backspace: si el campo está vacío, ir al anterior
    if (
      event.key === "Backspace" &&
      !this.digitGroup.controls[index].value &&
      index > 0
    ) {
      this.focusPreviousInput(index - 1);
    }

    // Flecha derecha: ir al siguiente input
    if (
      event.key === "ArrowRight" &&
      index < this.digitGroup.controls.length - 1
    ) {
      this.focusNextInput(index + 1);
    }

    // Flecha izquierda: ir al input anterior
    if (event.key === "ArrowLeft" && index > 0) {
      this.focusPreviousInput(index - 1);
    }

    // Solo permitir números, backspace, delete y teclas de navegación
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  /**
   * Maneja el pegado de códigos completos
   * @param event - Evento de pegado
   */
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData("text") || "";

    // Solo procesar si son exactamente 6 dígitos
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      digits.forEach((digit, index) => {
        if (index < this.digitGroup.controls.length) {
          this.digitGroup.controls[index].setValue(digit);
        }
      });

      // Enfocar el último input
      this.focusNextInput(5);
    }
  }

  /**
   * Enfoca el siguiente input
   * @param index - Índice del input a enfocar
   */
  private focusNextInput(index: number): void {
    const nextInput = document.querySelector(
      `#input${index}`
    ) as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
      nextInput.select();
    }
  }

  /**
   * Enfoca el input anterior
   * @param index - Índice del input a enfocar
   */
  private focusPreviousInput(index: number): void {
    const prevInput = document.querySelector(
      `#input${index}`
    ) as HTMLInputElement;
    if (prevInput) {
      prevInput.focus();
      prevInput.select();
    }
  }
}
