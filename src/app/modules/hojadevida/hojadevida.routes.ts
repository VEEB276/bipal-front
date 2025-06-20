import { Routes } from "@angular/router";

export const HOJA_DE_VIDA_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./gestionar-hv/gestionar-hv.component").then(
        (m) => m.GestionarHvComponent
      ),
  },
];
