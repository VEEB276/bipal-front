import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatDivider } from "@angular/material/divider";
import { RouterModule } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatCheckbox } from "@angular/material/checkbox";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../../core/auth/auth.service";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-registrarse",
  imports: [
    MatInputModule,
    MatIcon,
    MatDivider,
    RouterModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckbox,
  ],
  templateUrl: "./registrarse.component.html",
  styleUrl: "./registrarse.component.scss",
})
export class RegistrarseComponent {
  //injectamos las depdencias
  private readonly authService = inject(AuthService);

  BorrarData() {
    console.log("hola");
  }
  registerForm: FormGroup;
  clickOnCheckbox = false;
  // cooldown de reenvío
  isCooldown = false;
  cooldownSeconds = environment.emailSenderCooldown ?? 60;
  private cooldownTimer: any = null;

  constructor(
    private fb: FormBuilder,
    private routerBj: Router,
    private httpBj: HttpClient
  ) {
    this.registerForm = this.fb.group({
      documentNumber: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\d+$/), //validator de digitos numericos
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+*-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ), // REGEX PARA CORREO
        ],
      ],
    });
  }
  /**
   * Este metodo se encarga de avisarle al front que el codigo de verificacion ya fue enviado
   * al usuario por medio de la API de supabase y se proceda a cargar la vista de llenado del codigo
   */
  consultarEstadoCodigo(): void {
    this.authService
      .sendCodeVerification(
        this.registerForm.value.email,
        this.registerForm.value.documentNumber
      )
      .then(({ error }) => {
        if (error) {
          const code = (error as any)?.code ?? (error as any)?.status ?? "";
          // Manejo de rate limit: iniciar cooldown 60s
          if (
            code === "over_email_send_rate_limit" ||
            code === 429 ||
            code === "email_rate_limit_exceeded"
          ) {
            this.startCooldown(environment.emailSenderCooldown ?? 60);
          }
          console.error("Error al enviar el código de verificación:", error);
        } else {
          //origin es el type
          this.routerBj.navigate(["auth", "comprobar-codigo"], {
            queryParams: {
              email: this.registerForm.value.email,
              documento: this.registerForm.value.documentNumber,
              origin: "register",
            },
          });
        }
      });
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    if (this.clickOnCheckbox && this.registerForm.valid && !this.isCooldown) {
      this.consultarEstadoCodigo();
    }
  }

  // Keep only digits when the user types
  onDocumentInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const sanitized = input.value.replace(/\D+/g, "");
    if (sanitized !== input.value) {
      // update the native input and the form control without emitting another input event
      input.value = sanitized;
      this.registerForm.controls["documentNumber"].setValue(sanitized, {
        emitEvent: false,
      });
    }
  }

  // Handle paste: filter out non-digits
  onDocumentPaste(event: ClipboardEvent) {
    const paste = event.clipboardData?.getData("text") ?? "";
    const sanitized = paste.replace(/\D+/g, "");
    if (sanitized !== paste) {
      event.preventDefault();
      // insert sanitized value at cursor position
      const input = event.target as HTMLInputElement;
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      const newValue = input.value.slice(0, start) + sanitized + input.value.slice(end);
      input.value = newValue.replace(/\D+/g, "");
      this.registerForm.controls["documentNumber"].setValue(input.value, {
        emitEvent: false,
      });
    }
  }

  private startCooldown(seconds: number) {
    this.isCooldown = true;
    this.cooldownSeconds = seconds;
    if (this.cooldownTimer) {
      clearInterval(this.cooldownTimer);
    }
    this.cooldownTimer = setInterval(() => {
      this.cooldownSeconds -= 1;
      if (this.cooldownSeconds <= 0) {
        this.isCooldown = false;
        clearInterval(this.cooldownTimer);
        this.cooldownTimer = null;
      }
    }, 1000);
  }
}
