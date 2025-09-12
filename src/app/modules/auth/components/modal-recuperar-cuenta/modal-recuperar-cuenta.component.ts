import { Component } from '@angular/core';
import { MatFormField, MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-modal-recuperar-cuenta',
  imports: [
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
  ],
  templateUrl: './modal-recuperar-cuenta.component.html',
  styleUrl: './modal-recuperar-cuenta.component.scss',
})
export class ModalRecuperarCuentaComponent {
  
  //control validator del email de recuperar cuenta
  emailControl = new FormControl('', [Validators.required, Validators.email]);
 }

