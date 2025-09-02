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
import { NgIf } from '@angular/common';

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
    ReactiveFormsModule,
    NgIf
],
  templateUrl: './crear-clave.component.html',
  styleUrl: './crear-clave.component.scss'
})
export class CrearClaveComponent {
  private readonly authService = inject(AuthService);

  codeForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isSubmitting = false;

  // parámetros de entrada
  email = input<string>();
  numeroDocumento = input<number>();


  constructor(
    private fb: FormBuilder,
    private router: Router
  ){
    this.codeForm=this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+*-]+$/),
          PasswordValidators.UpperCaseCheck(),
          PasswordValidators.lengthCheck(6),
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

  get hasMinLength(): boolean {
    const password = this.codeForm.get('password')?.value;
    return password ? password.length >= 6 : false;
  }

  get hasUpperCase(): boolean {
    const password = this.codeForm.get('password')?.value;
    return password ? /[A-Z]/.test(password) : false;
  }

  get hasNumber(): boolean {
    const password = this.codeForm.get('password')?.value;
    return password ? /[0-9]/.test(password) : false;
  }

  get hasValidCharacters(): boolean {
    const password = this.codeForm.get('password')?.value;
    return password ? /^[a-zA-Z0-9._%+*-]+$/.test(password) : false;
  }

  crearUsuario() {
    if (this.codeForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
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
      }).finally(() => {
        this.isSubmitting = false;
      });
    }
  }
  
}
