import { Component } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { PasswordValidators } from "../../Validators/passwordValidators";

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
  ],
  templateUrl: "./iniciar-sesion.component.html",
  styleUrl: "./iniciar-sesion.component.scss",
})
export class IniciarSesionComponent {

  loginForm:FormGroup;
  
  constructor(private fb:FormBuilder){
    // console.log("INIT SESION");
    this.loginForm=this.fb.group({
      email:[// o numero
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+*-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),// REGEX PARA CORREO
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
    }
  }
}
