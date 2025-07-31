import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from "@angular/material/card";
import { PasswordValidators } from '../../Validators/passwordValidators';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';

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
  codeForm:FormGroup;
  
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
      ]
    })
  }
  crearUsuario() {
    // this.router.navigate(['../../'])
    this.router.navigate(['/auth'], { replaceUrl: true })
  }
  
}
