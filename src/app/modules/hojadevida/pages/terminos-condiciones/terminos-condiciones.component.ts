import { Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-terminos-condiciones",
  imports: [MatDividerModule, MatButton, RouterLink, MatIconModule],
  templateUrl: "./terminos-condiciones.component.html",
  styleUrl: "./terminos-condiciones.component.scss",
})
export class TerminosCondicionesComponent {
  showBack = inject(ActivatedRoute).snapshot.data["backButton"] || false;
}
