import { Component, inject, input, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatCard } from "@angular/material/card";
import { PasswordValidators } from "../../Validators/passwordValidators";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../../core/auth/auth.service";
import { InformacionPersonalService } from "../../../hojadevida/services/informacion-personal.service";
import { NgIf } from "@angular/common";
import { ContainerAuthComponent } from "../../components/container-auth/container-auth.component";
import { PasswordFormComponent } from "../../components/password-form/password-form.component";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-crear-clave",
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
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
  private readonly infoService = inject(InformacionPersonalService);

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
        .then(async () => {
          console.log("Usuario creado exitosamente");
          // Intentar migración por número de documento si está presente en metadata
          const numeroDocumento: string | undefined = this.authService.session?.user?.user_metadata?.numeroDocumento;
          if (numeroDocumento) {
            try {
              const migrado = await firstValueFrom(
                this.infoService.migrarUsuarioPorNumeroDocumento(numeroDocumento)
              );
              if (migrado) {
                // Recargar user para reflejar idPersona actualizado por backend
                await this.authService.reloadUser();
              }
            } catch (e) {
              console.warn("Migración no completada:", (e as Error).message);
            }
          }
          // Redirigir al usuario a la página principal de hoja de vida
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
