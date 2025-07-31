import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormBuilder, FormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDivider, MatDividerModule } from "@angular/material/divider";
import { RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { IniciarSesionComponent } from "./components/iniciar-sesion/iniciar-sesion.component";
import { RegistrarseComponent } from "./components/registrarse/registrarse.component";
import {
  MatAccordion,
  MatExpansionPanelContent,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
  MatExpansionPanelDescription,
  MatExpansionModule,
} from "@angular/material/expansion";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CommonModule } from "@angular/common";
import { FullContainerAuthComponent } from "./components/full-container-auth/full-container-auth.component";
// import {IniciarSesionComponent} from "./components/iniciar-sesion";
@Component({
  selector: "app-authentication",
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatDividerModule,
    RouterModule,
    MatExpansionModule,
    MatCheckboxModule,
    CommonModule,
    // FullContainerAuthComponent,
    RouterModule
],
  templateUrl: "./authentication.component.html",
  styleUrl: "./authentication.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent {
 
}
