import { Component, input } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidators } from '../../Validators/passwordValidators';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-reset-pasword-component',
  imports: [
    MatInputModule, 
    MatIconModule,
    ReactiveFormsModule,
    MatDivider,
    MatFormFieldModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './reset-pasword-component.component.html',
  styleUrl: './reset-pasword-component.component.scss'
})
export class ResetPaswordComponentComponent {
  codeForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isSubmitting = false; // Para controlar el estado de loading

  // parámetros de entrada
  email = input<string>();
  numeroDocumento = input<number>();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ){
    this.codeForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          // Caracteres validos del regex: cualquiera que no sea emojis, espacios o cosas raras
          Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+\\-=\[\\]{}|:;"\'<>,.?\\\\/]+$'),
          PasswordValidators.UpperCaseCheck(),
          PasswordValidators.lengthCheck(6),
          PasswordValidators.numberCheck()
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ]
    }, {
      validators: PasswordValidators.matchPassword('password')
    })
  }
//---------------------------checkList---------------------------------------------------------------------
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
    return password ? /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|:;"'<>,.?\\/]+$/.test(password) : false;
  }

  get passwordsMatch(): boolean {
    const password = this.codeForm.get('password')?.value;
    const confirmPassword = this.codeForm.get('confirmPassword')?.value;
    return password && confirmPassword ? password === confirmPassword : false;
  }

  get isPasswordNotEmpty(): boolean {
    const password = this.codeForm.get('password')?.value;
    return password ? password.length > 0 : false;
  }
//-----------------------------------------------------------------------------------------------
  // Getter para debuggear el estado del formulario

  // get formState(): any {
  //   const password = this.codeForm.get('password');
  //   const confirmPassword = this.codeForm.get('confirmPassword');
  //   let state = {
  //     passwordValue: password?.value,
  //     passwordTouched: password?.touched,
  //     passwordDirty: password?.dirty,
  //     passwordValid: password?.valid,
  //     passwordErrors: password?.errors,
      
  //     confirmValue: confirmPassword?.value,
  //     confirmTouched: confirmPassword?.touched,
  //     confirmDirty: confirmPassword?.dirty,
  //     confirmValid: confirmPassword?.valid,
  //     confirmErrors: confirmPassword?.errors,
      
  //     formValid: this.codeForm.valid,
  //     formErrors: this.codeForm.errors,
      
  //     checksState: {
  //       minLength: this.hasMinLength,
  //       upperCase: this.hasUpperCase,
  //       number: this.hasNumber,
  //       validChars: this.hasValidCharacters,
  //       passwordsMatch: this.passwordsMatch,
  //       notEmpty: this.isPasswordNotEmpty
  //     }
  //   };
  //   return state;
  // }

  onSubmit() {
    if (this.codeForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Simular un pequeño delay para mostrar el estado de loading
      // Aquí normalmente iría tu llamada al backend
      setTimeout(() => {
        // Primero mostrar la notificación de éxito
        this.notificationService.showSuccess('¡Contraseña actualizada exitosamente! Ya puedes iniciar sesión con tu nueva contraseña.');

        // Luego navegar al login
        this.router.navigate(['/auth'], {
          replaceUrl: true // Esto reemplaza la entrada en el historial para que no pueda volver al reset
        }).then(() => {
          this.isSubmitting = false;
        }).catch((error) => {
          this.notificationService.showError('Hubo un error al redireccionar. Por favor, intenta nuevamente.');
          this.isSubmitting = false;
        });
      }, 1000); // 1 segundo de delay para simular el proceso
    }
  }
}
