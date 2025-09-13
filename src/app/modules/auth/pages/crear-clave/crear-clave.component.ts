import { Component, inject, input, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatCard } from "@angular/material/card";
import { PasswordValidators } from "../../Validators/passwordValidators";
import { MatInputModule, MatLabel } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../../core/auth/auth.service";
import { NgIf } from "@angular/common";
import { ContainerAuthComponent } from "../../components/container-auth/container-auth.component";
import { PasswordFormComponent } from "../../components/password-form/password-form.component";

@Component({
  selector: "app-crear-clave",
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatLabel,
    RouterModule,
    MatCard,
    ReactiveFormsModule,
    ContainerAuthComponent,
    PasswordFormComponent,
  ],
  templateUrl: "./crear-clave.component.html",
  styleUrl: "./crear-clave.component.scss",
})
export class CrearClaveComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isSubmitting = false;

  @ViewChild(PasswordFormComponent)
  passwordFormComponent!: PasswordFormComponent;

  get codeForm() {
    return this.passwordFormComponent?.form;
  }

  crearUsuario() {
    if (this.codeForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      this.authService
        .createUserAccount(this.codeForm.value.password)
        .then(() => {
          console.log("Usuario creado exitosamente");
          // Redirigir al usuario a la página de inicio de sesión o a donde sea necesario
          this.router.navigate(["/hoja-de-vida"], { replaceUrl: true });
        })
        .catch((error) => {
          console.error("Error al crear el usuario:", error);
          // Manejar el error, mostrar un mensaje al usuario, etc.
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    }
  }
}
