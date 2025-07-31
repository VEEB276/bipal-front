import { Component } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { ComprobarCodigoComponent } from "../comprobar-codigo/comprobar-codigo.component";
import { CrearClaveComponent } from "../crear-clave/crear-clave.component";

@Component({
  selector: 'app-crear-usuario',
  imports: [MatCard, ComprobarCodigoComponent, CrearClaveComponent],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent {
  comprobarCodigoP:boolean=true;
  verificarCodigoValido( mostrarComprobarCodigo:boolean) {
    // console.log(evt);
    this.comprobarCodigoP=mostrarComprobarCodigo;
  }

}
