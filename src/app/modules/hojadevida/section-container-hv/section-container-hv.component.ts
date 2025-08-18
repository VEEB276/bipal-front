import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
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
import { selectIdHojaVida, selectIdPersona } from "../store";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-section-container-hv",
  templateUrl: "./section-container-hv.component.html",
  styleUrl: "./section-container-hv.component.scss",
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
    ExperienciaComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionContainerHvComponent {
  //esto es para asegurarse que no se muestre el formulario hasta que haya cargado
  //la infromacion del usuario.
  idHojaVida = inject(Store).selectSignal(selectIdHojaVida);
  private readonly store = inject(Store);

  isCreated = computed<boolean>(
    () => !!this.store.selectSignal(selectIdPersona)()
  );
}
