import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ConfirmDialogService } from "../../../../core/services";
import { Store } from "@ngrx/store";
import { selectIdPersona } from "../../store";
import { EliminarDatosService } from "./services/eliminar-datos.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-eliminar-datos",
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: "./eliminar-datos.component.html",
  styleUrl: "./eliminar-datos.component.scss",
})
export class EliminarDatosComponent {
  private readonly confirm = inject(ConfirmDialogService);
  private readonly eliminarService = inject(EliminarDatosService);
  private readonly auth = inject(AuthService);
  private readonly store = inject(Store);
  private readonly idPersona = this.store.selectSignal(selectIdPersona);

  onClickDeleteAll(): void {
    this.confirm
      .open({
        type: "delete",
        title: "Eliminar todos mis datos",
        message:
          "Esta acción <strong>eliminará permanentemente toda</strong> la información asociada a tu cuenta. ¿Deseas continuar?",
      })
      .subscribe((ok) => {
        if (!ok) return;
        // Invocar servicio backend usando idPersona desde el token
        this.eliminarService
          .eliminarPersonaCompleta()
          .subscribe(() => this.auth.signOut());
      });
  }
}
