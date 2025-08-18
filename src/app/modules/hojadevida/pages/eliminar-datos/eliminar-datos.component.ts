import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ConfirmDialogService } from "../../../../core/services";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-eliminar-datos",
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: "./eliminar-datos.component.html",
  styleUrl: "./eliminar-datos.component.scss",
})
export class EliminarDatosComponent {
  private readonly confirm = inject(ConfirmDialogService);

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
        // TODO: Invocar servicio backend para eliminar datos y cerrar sesión si aplica
        // Placeholder de acción
        console.log("Eliminar todos los datos del usuario");
      });
  }
}
