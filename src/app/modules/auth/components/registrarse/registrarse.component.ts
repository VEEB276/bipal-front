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
