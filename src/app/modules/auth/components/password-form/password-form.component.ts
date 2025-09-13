import { Component, input } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/auth/auth.service";
import { NotificationService } from "../../../../core/services";
import { PasswordValidators } from "../../Validators/passwordValidators";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-password-form",
  imports: [
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: "./password-form.component.html",
  styleUrls: ["./password-form.component.scss"]
})
export class PasswordFormComponent {
  form: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isSubmitting = false; // Para controlar el estado de loading

  // parámetros de entrada
  email = input<string>();
  numeroDocumento = input<number>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private auth: AuthService
  ) {
    this.form = this.fb.group(
      {
        password: [
          "",
          [
            Validators.required,
            // Caracteres validos del regex: cualquiera que no sea emojis, espacios o cosas raras
            Validators.pattern(
              "^[a-zA-Z0-9!@#$%^&*()_+\\-=[\\]{}|:;\"'<>,.?\\\\/]+$"
            ),
            PasswordValidators.UpperCaseCheck(),
            PasswordValidators.lengthCheck(6),
            PasswordValidators.numberCheck(),
          ],
        ],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validators: PasswordValidators.matchPassword("password"),
      }
    );
  }
  //---------------------------checkList---------------------------------------------------------------------
  get hasMinLength(): boolean {
    const password = this.form.get("password")?.value;
    return password ? password.length >= 6 : false;
  }

  get hasUpperCase(): boolean {
    const password = this.form.get("password")?.value;
    return password ? /[A-Z]/.test(password) : false;
  }

  get hasNumber(): boolean {
    const password = this.form.get("password")?.value;
    return password ? /[0-9]/.test(password) : false;
  }

  get hasValidCharacters(): boolean {
    const password = this.form.get("password")?.value;
    return password
      ? /[!@#$%^&*()_+\-=\[\]{}|:;"'<>,.?\\/]+/.test(password)
      : false;
  }

  get passwordsMatch(): boolean {
    const password = this.form.get("password")?.value;
    const confirmPassword = this.form.get("confirmPassword")?.value;
    return password && confirmPassword ? password === confirmPassword : false;
  }

  get isPasswordNotEmpty(): boolean {
    const password = this.form.get("password")?.value;
    return password ? password.length > 0 : false;
  }

  onSubmit() {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const password: string = this.form.value.password;

      this.auth
        .resetPasswordWithNewPassword(password)
        .then(({ error }) => {
          if (error) {
            return false;
          }
          // Redirigir al login después de actualizar la contraseña
          return this.router.navigate(["/auth"], { replaceUrl: true });
        })
        .catch(() => {
          // La notificación de error ya se mostró en el servicio
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    }
  }
}
