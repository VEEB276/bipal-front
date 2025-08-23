import { Component, input } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidators } from '../../Validators/passwordValidators';

@Component({
  selector: 'app-reset-pasword-component',
  imports: [MatCard, MatInputModule, MatIconModule],
  templateUrl: './reset-pasword-component.component.html',
  styleUrl: './reset-pasword-component.component.scss'
})
export class ResetPaswordComponentComponent {

  codeForm:FormGroup;

  //parametros de entrada
  email = input<string>();
  numeroDocumento = input<number>();


  constructor(
    private fb: FormBuilder,
    private router: Router
  ){
    this.codeForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+*-]+$/), // Eliminé los espacios extra del regex
          PasswordValidators.UpperCaseCheck(),
          PasswordValidators.lenghtCheck(6),
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
}
