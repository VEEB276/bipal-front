import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  MatExpansionPanel,
  MatExpansionModule,
  MatAccordion,
} from "@angular/material/expansion";
import { RegistrarseComponent } from "../registrarse/registrarse.component";
import { IniciarSesionComponent } from "../iniciar-sesion/iniciar-sesion.component";

@Component({
  selector: "app-full-container-auth",
  imports: [
    MatExpansionPanel,
    MatExpansionModule,
    RegistrarseComponent,
    IniciarSesionComponent,
    MatAccordion
  ],
  templateUrl: "./full-container-auth.component.html",
  styleUrl: "./full-container-auth.component.scss",
})
export class FullContainerAuthComponent {}
