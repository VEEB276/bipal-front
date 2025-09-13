import { Component, inject } from "@angular/core";
import { MatFormField } from "@angular/material/select";
import { MatCard, MatCardModule } from "@angular/material/card";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatError, MatInput, MatLabel } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { Router } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { AuthService } from "../../../../core/auth/auth.service";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: "app-recuperar-cuenta",
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInput,
    MatButton,
    MatCard,
    MatIcon,
    MatError,
  ],
  templateUrl: "./recuperar-cuenta.component.html",
  styleUrl: "./recuperar-cuenta.component.scss",
})
export class RecuperarCuentaComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  //control validator del email de recuperar cuenta
  emailControl = new FormControl("", [Validators.required, Validators.email]);
  recuperarCuentaClickeado = false;

  recuperarCuenta() {
    this.emailControl.markAsUntouched();
    if (this.emailControl.valid) {
      this.auth.sendPasswordReset(this.emailControl.value).then(({ error }) => {
        if (error) return;

        this.router.navigate(["/auth/comprobar-codigo"], {
          state: { email: this.emailControl.value },
          queryParams: { email: this.emailControl.value, origin: 'reset' },
        });
      });
    }
  }
  cerrarModal() {
    this.router.navigate(["/auth/"]);
  }
}
