import { Component, inject, input, ViewChild } from "@angular/core";
import { MatCard } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router } from "@angular/router";
import { PasswordValidators } from "../../Validators/passwordValidators";
import { MatDivider } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { NotificationService } from "../../../../core/services/notification.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { PasswordFormComponent } from "../../components/password-form/password-form.component";

@Component({
  selector: "app-reset-pasword-component",
  imports: [
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDivider,
    MatFormFieldModule,
    MatButtonModule,
    NgIf,
    PasswordFormComponent,
  ],
  templateUrl: "./reset-pasword-component.component.html",
  styleUrl: "./reset-pasword-component.component.scss",
})
export class ResetPaswordComponentComponent {
  isSubmitting = false; // Para controlar el estado de loading

  private auth = inject(AuthService);
  private router = inject(Router);

  @ViewChild(PasswordFormComponent)
  passwordFormComponent!: PasswordFormComponent;

  get codeForm() {
    return this.passwordFormComponent?.form;
  }

  onSubmit() {
    if (this.codeForm?.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const password: string = this.codeForm.value.password;

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

  // Permite cancelar el flujo de recuperación y cerrar sesión explícitamente
  cancelRecovery() {
    this.auth.signOut().finally(() => {
      this.router.navigate(["/auth"], { replaceUrl: true });
    });
  }
}
