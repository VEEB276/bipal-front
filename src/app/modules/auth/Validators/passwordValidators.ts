// Aqui iran las validaciones individuales de la contraseña
import { AbstractControl, MinLengthValidator, ValidationErrors, ValidatorFn } from "@angular/forms";
/** POR QUE IMPORTARLOS?
 * AbstractControl: 👁️ Lee los estados del elemento, como: (control.touched, control.valid, etc.) o acceder al valor actual "control.value"
 * ValidatorError: 🪧 Se usa por Angular para renderizar los mensajes de error en tu HTML
 *                 📦 Permite retornar objetos como { uppercase: true } o { minLength: { requiredLength: 8, actualLength: 5 } }
 * ValidatorFn: 📌 Declarar funciones que se pueden usar en Validators.compose
 *              🧱 Definir validators reutilizables y estáticos en clases
 */

export class PasswordValidators{ 

    static UpperCaseCheck():ValidatorFn{ // validatorFn dice: "Esta función va a devolver un validador que Angular acepte."
        return(control: AbstractControl): ValidationErrors| null=>{ //el objeto control es el asignado al input  
            /* 
            * Aqui va la validacion como tal, el corazon de la función
            * El validador usa .test() para verificar si se cumple la condición de tener mayúsculas. 
            * Si se cumple, retorna null (es decir, sin errores). Si no se cumple, retorna un objeto con
            * { uppercase: true }, lo cual representa un error en el campo uppercase dentro de ValidatorErrors.
            * En este contexto, "uppercase": true significa que la validación ha fallado para ese criterio.
            */
            return /A-Z/.test(control.value)? null : {uppercase:true}//uppercase:true indica que se cumple que fallo, es true el failed
            //[A-Z]/.test("contraseña123") → devuelve false
        }
    }
    static numberCheck():ValidatorFn{
        return(control:AbstractControl): null| ValidationErrors =>{
            return /\d/.test(control.value)? null: {number: true}
        }
    }
    static lenghtCheck(minLength: number= 6):ValidatorFn{
        return(input:AbstractControl): null| ValidationErrors=>{
            return input.value?.lenght >= minLength ? null : {minLength:true}
        }

    }
    
}
