import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { ComprobarCodigoComponent } from "../comprobar-codigo/comprobar-codigo.component";
import { CrearClaveComponent } from "../crear-clave/crear-clave.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  imports: [MatCard, ComprobarCodigoComponent, CrearClaveComponent],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent implements OnInit {
  //injectamos las dependencias
  private readonly route = inject(ActivatedRoute);

  emailUser =  signal<string>("");
  documentoUser = signal<number>(null);
  comprobarCodigoP:boolean=true;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.emailUser.set(params['email'] || "");
      this.documentoUser.set(parseInt(params['documento']) || null);
    });
    console.log("Email recibido en crear-usuario:", this.emailUser(), this.documentoUser());
  }

  verificarCodigoValido( mostrarComprobarCodigo:boolean) {
    // console.log(evt);
    this.comprobarCodigoP=mostrarComprobarCodigo;
  }

}
