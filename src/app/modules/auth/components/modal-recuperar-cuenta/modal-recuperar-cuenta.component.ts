import { Component, inject } from '@angular/core';
import { MatFormField, MatSelectModule } from "@angular/material/select";
import { MatCard, MatCardModule } from "@angular/material/card";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button'
import {Router} from '@angular/router'
import { MatIcon } from '@angular/material/icon';
// import { ConfirmDialogService } from "../../../../core/services";
@Component({
  selector: 'app-modal-recuperar-cuenta',
  imports: [
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatCard,
    MatIcon

  ],
  templateUrl: './modal-recuperar-cuenta.component.html',
  styleUrl: './modal-recuperar-cuenta.component.scss',
})
export class ModalRecuperarCuentaComponent {
  // private readonly modal=inject(ConfirmDialogService);
  constructor(private router: Router) {

  }
  //control validator del email de recuperar cuenta
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  recuperarCuentaClickeado= false;

//  llamarModal(){
//     this.modal.open({
//       title:"Recuperar contraseña",
//       type:"confirm",
//       component:ModalRecuperarCuentaComponent,
//       primaryText:"Reestablecer contraseña",
//     })
//   }
//TODO: PENDIENTE DE LLAMAR A LAS VISTAS (ENRUTANDOLAS)
llamarModalMensajeEnviado(){
  if(this.emailControl.valid){
    this.router.navigate(['/auth/comprobar-codigo'], {
      state: { email: this.emailControl.value },
      queryParams: {email: this.emailControl.value}
    })  
  }

}
cerrarModal(){
    this.router.navigate(['/auth/'])  
  }
}
