import { ChangeDetectionStrategy, Component } from "@angular/core";
import { InfoPersonalComponent } from "../components/info-personal/info-personal.component";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelContent,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from "@angular/material/expansion";
import { MatIcon } from "@angular/material/icon";
import { PerfilAcademicoComponent } from "../components/perfil-academico";
import { OtrosEstudiosComponent } from "../components/otros-estudios";
import { ExperienciaComponent } from "../components/experiencia";

@Component({
  selector: "app-gestionar-hv",
  templateUrl: "./gestionar-hv.component.html",
  styleUrl: "./gestionar-hv.component.scss",
  imports: [
    InfoPersonalComponent,
    MatIcon,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelContent,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    PerfilAcademicoComponent,
    OtrosEstudiosComponent,
    ExperienciaComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionarHvComponent {}
