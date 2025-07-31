import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatDivider } from "@angular/material/divider";
import { RouterModule } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatCheckbox } from "@angular/material/checkbox";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-registrarse",
  imports: [
    MatInputModule,
    MatIcon,
    MatDivider,
    RouterModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckbox,
  ],
  templateUrl: "./registrarse.component.html",
  styleUrl: "./registrarse.component.scss",
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrarseComponent {
BorrarData() {
console.log('hola');

}
  registerForm: FormGroup;
  clickOnCheckbox = false;

  constructor(
    private fb: FormBuilder,
    private routerBj: Router,
    private httpBj: HttpClient
  ) {
    this.registerForm = this.fb.group({
      documentNumber: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\d+$/), //validator de digitos numericos
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+*-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ), // REGEX PARA CORREO
        ],
      ],
    });
  }
  /**
   * Este metodo se encarga de avisarle al front que el codigo de verificacion ya fue enviado
   * al usuario por medio de la API de supabase y se proceda a cargar la vista de llenado del codigo 
   */
  consultarEstadoCodigo():void {
    const estadoEnviado: boolean = true;
    //Aqui se llama al API de supabase
    // this.httpBj.post("https://developer.marvel.com/",{})
    if(estadoEnviado===true){
      this.routerBj.navigate(['auth','crear-usuario'])
    }
  }

  onSubmit() {
    //this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    if (this.clickOnCheckbox && this.registerForm.valid) {
      console.info("la información del formulario es:", this.registerForm.value);
    }
  }
}
