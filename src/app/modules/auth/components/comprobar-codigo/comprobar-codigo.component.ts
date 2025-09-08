import { Component, EventEmitter, inject, input, Output } from "@angular/core";
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
import { AuthService } from "../../../../core/auth/auth.service";
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
  private readonly authService = inject(AuthService);

  // Entradas
  email = input<string>("");

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
      this.authService.verifyEmailCode(this.email(), codigoIngresadoH).then((response) => {
        if (response.error) {
          console.error("Error al verificar el código:", response.error.message);
          // Manejar error de verificación
        } else {
          console.log("Código verificado exitosamente");
          // Emitir true para indicar que debe mostrar el componente crear-clave
          this.next.emit(false);
        }
      });
    //TODO: le faltan cositas al verificar pero creo que eos lo hace supabase
    }
  }

  toFormControl(item: any){
    return item as FormControl;
  }

  /**
   * Maneja el cambio de input para auto-avanzar al siguiente campo
   * @param event - Evento del input
   * @param index - Índice del input actual
   */
  onInputChange(event: any, index: number): void {
    const value = event.target.value;
    
    // Solo permitir números
    if (value && !/^\d$/.test(value)) {
      event.target.value = '';
      this.digitGroup.controls[index].setValue('');
      return;
    }

    // Si hay un valor y no es el último input, avanzar al siguiente
    if (value && index < this.digitGroup.controls.length - 1) {
      this.focusNextInput(index + 1);
    }
  }

  /**
   * Maneja las teclas especiales como Backspace y flechas
   * @param event - Evento del teclado
   * @param index - Índice del input actual
   */
  onKeyDown(event: KeyboardEvent, index: number): void {
    // Backspace: si el campo está vacío, ir al anterior
    if (event.key === 'Backspace' && !this.digitGroup.controls[index].value && index > 0) {
      this.focusPreviousInput(index - 1);
    }
    
    // Flecha derecha: ir al siguiente input
    if (event.key === 'ArrowRight' && index < this.digitGroup.controls.length - 1) {
      this.focusNextInput(index + 1);
    }
    
    // Flecha izquierda: ir al input anterior
    if (event.key === 'ArrowLeft' && index > 0) {
      this.focusPreviousInput(index - 1);
    }

    // Solo permitir números, backspace, delete y teclas de navegación
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  /**
   * Maneja el pegado de códigos completos
   * @param event - Evento de pegado
   */
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    
    // Solo procesar si son exactamente 6 dígitos
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      digits.forEach((digit, index) => {
        if (index < this.digitGroup.controls.length) {
          this.digitGroup.controls[index].setValue(digit);
        }
      });
      
      // Enfocar el último input
      this.focusNextInput(5);
    }
  }

  /**
   * Enfoca el siguiente input
   * @param index - Índice del input a enfocar
   */
  private focusNextInput(index: number): void {
    const nextInput = document.querySelector(`#input${index}`) as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
      nextInput.select();
    }
  }

  /**
   * Enfoca el input anterior
   * @param index - Índice del input a enfocar
   */
  private focusPreviousInput(index: number): void {
    const prevInput = document.querySelector(`#input${index}`) as HTMLInputElement;
    if (prevInput) {
      prevInput.focus();
      prevInput.select();
    }
  }

}
