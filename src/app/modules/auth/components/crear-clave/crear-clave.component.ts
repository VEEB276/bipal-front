import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from "@angular/material/card";
import { PasswordValidators } from '../../Validators/passwordValidators';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-crear-clave',
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatLabel,
    RouterModule,
    MatCard,
    ReactiveFormsModule
],
  templateUrl: './crear-clave.component.html',
  styleUrl: './crear-clave.component.scss'
})
export class CrearClaveComponent {
  private readonly authService = inject(AuthService);

  codeForm:FormGroup;

  //parametros de entrada
  email = input<string>();
  numeroDocumento = input<number>();


  constructor(
    private fb: FormBuilder,
    private router: Router
  ){
    this.codeForm=this.fb.group({
      password:[
        '',
        [
          Validators.required,
          Validators.pattern(/^ [a-zA-Z0-9._%+*-]+\ $/), //TODO: revisar este regex
          PasswordValidators.UpperCaseCheck(),
          PasswordValidators.lenghtCheck(6), // TODO: es necesario el parametro?
          PasswordValidators.numberCheck()
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          PasswordValidators.matchPassword('password')]
      ]
    })
  }
  crearUsuario() {
    this.authService.createUserAccount(
      this.numeroDocumento(),
      this.email(),
      this.codeForm.value.password
    ).then(() => {
      console.log("Usuario creado exitosamente");
      // Redirigir al usuario a la página de inicio de sesión o a donde sea necesario
      this.router.navigate(['/hoja-de-vida'], { replaceUrl: true });
    }).catch(error => {
      console.error("Error al crear el usuario:", error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    });

  }
  
}
