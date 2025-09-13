import { Component, inject } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { Router, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from "../../../../core/auth/auth.service";
import { MatCard, MatCardModule } from "@angular/material/card";
import { ConfirmDialogService } from "../../../../core/services";
import { ModalRecuperarCuentaComponent } from "../modal-recuperar-cuenta/modal-recuperar-cuenta.component";

@Component({
  selector: "app-iniciar-sesion",
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDivider,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIcon,
    MatTooltipModule,
    MatCardModule,
],
  templateUrl: "./iniciar-sesion.component.html",
  styleUrl: "./iniciar-sesion.component.scss",
})
export class IniciarSesionComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly modal=inject(ConfirmDialogService);

  loginForm: FormGroup;
  hidePassword = true;
  clickOnOlvidarContrasena=false;
  //control validator del email de recuperar cuenta
  emailControl = new FormControl('', [Validators.required, Validators.email]);


  get isValidInput(): boolean {
    const control = this.loginForm?.get('email');
    if (!control || !control.value) return false;
    
    const value = control.value.toString();
    return this.isEmail(value) || this.isDocument(value);
  }

  get isValidEmail(): boolean {
    const control = this.loginForm?.get('email');
    if (!control || !control.value) return false;
    
    return this.isEmail(control.value.toString());
  }

  private isEmail(value: string): boolean {
    return /^[a-zA-Z0-9._%+*-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  }

  private isDocument(value: string): boolean {
    return /^\d{8,10}$/.test(value);
  }

  get getErrorMessage(): string {
    const control = this.loginForm?.get('email');
    if (!control) return '';
    if (!control.value) return 'Este campo es requerido';
    if (!this.isEmail(control.value) && !this.isDocument(control.value)) {
      return 'Ingresa un correo electrónico válido o un número de documento (8-10 dígitos)';
    }
    return '';
  }

  get tooltipMessage(): string {
    if (!this.loginForm?.get('email')?.value) {
      return 'Debes ingresar un correo electrónico o número de documento';
    }
    const value = this.loginForm?.get('email')?.value;
    if (!value) {
      return 'Debes ingresar un correo electrónico para recuperar tu contraseña';
    }
    if (this.isDocument(value)) {
      return 'Para recuperar tu contraseña, debes ingresar un correo electrónico';
    }
    if (!this.isValidEmail) {
      return 'Ingresa un correo electrónico válido para recuperar tu contraseña';
    }
    return '';
  }
  
  constructor(private fb:FormBuilder){
    // console.log("INIT SESION");
    this.loginForm=this.fb.group({
      email:[
        '',
        [
          Validators.required
        ]
      ],
      password:[
        '',
        [
          Validators.required
        ]
      ]
    })
    
    // this.loginForm.controls["password"].touched
  }
  // -----------------
  onSubmit(){
    if(this.loginForm.valid){
      console.info('la información del formulario es:', this.loginForm.value);
      this.authService.signIn(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).then(({ user, error }) => {
        if (error) {
          console.error("Error al iniciar sesión:", error);
          //TODO: mostrar la notificacion de error
        } else {
          console.log("Usuario autenticado:", user);
          // Redirigir a la hoja de vida o realizar otra acción
          this.router.navigate(['/hoja-de-vida'],{ queryParams:{email: this.loginForm.value.email, origin:"login" }});
          this.loginForm.reset();
        }
      });
    }
  }
  // ponerParametros(){
  //  this.router.navigate(['/hoja-de-vida'],{ queryParams:{email: this.loginForm.value.email, origin:"login" }});
  // }
  // llamarModal(){
  //   this.modal.open({
  //     title:"Recuperar contraseña",
  //     type:"confirm",
  //     component:ModalRecuperarCuentaComponent,
  //     primaryText:"Reestablecer contraseña",
  //   })

  // }
}
  