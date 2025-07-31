// import { JsonPipe } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
@Component({
  selector: "app-comprobar-codigo",
  imports: [
    MatCard,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./comprobar-codigo.component.html",
  styleUrl: "./comprobar-codigo.component.scss",
})
export class ComprobarCodigoComponent {
  @Output() next = new EventEmitter<any>();
  // form:FormControl=new form
  formCode: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formCode = this.fb.group({
      digitsGroup: this.fb.array([
        this.fb.control("", [Validators.required, Validators.pattern(/^\d$/)]),
        this.fb.control("", [Validators.required, Validators.pattern(/^\d$/)]),
        new FormControl("", [Validators.required, Validators.pattern(/^\d$/)]),
        new FormControl("", [Validators.required, Validators.pattern(/^\d$/)]),
      ]),
    });

    this.digitGroup.controls[0]
   //var a = this.formCode.controls["digitsGroup"] as FormArray
  }
  //este get accede a la informacion del controler digitGroup del formulario formcode
  get digitGroup():FormArray{
    return this.formCode.get('digitsGroup') as FormArray
  }
  verificarCodigo(){
    if(this.formCode.valid){
      /**si las casillas no infringieron ningun validador, entonces se procede a concatenar los digitos ingresaados
      e igualarlos a la variable codigoIngresadoH*/
      const codigoIngresadoH = this.digitGroup.value.join('');
      console.log("el codigo ingresado es: ", codigoIngresadoH,"?");
      // Emite false para indicar que debe mostrar el componente crear-clave
      this.next.emit(false);
    }
    //TODO: le faltan cositas al verificar pero creo que eos lo hace supabase
  }
  //casteo forzado
  prueba(item: any){
    return item as FormControl;
  }

}
