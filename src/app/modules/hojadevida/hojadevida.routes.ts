import { Routes } from "@angular/router";
import { personaPrefetchGuard } from './store';

export const HOJA_DE_VIDA_ROUTES: Routes = [
  {
    path: "",
    redirectTo: "personal",
    pathMatch: "full",
  },
  {
    path: "personal",
    canActivate: [personaPrefetchGuard],
    loadComponent: () =>
      import("./section-container-hv/section-container-hv.component").then(
        (c) => c.SectionContainerHvComponent
      ),
  },
  {
    path: "terminos-condiciones",
    loadComponent: () =>
      import("./terminos-condiciones/terminos-condiciones.component").then(
        (c) => c.TerminosCondicionesComponent
      ),
  },

  //tiene que ir de final para ser menos IMPORTANTE
  // Ruta comodín: cualquier ruta no coincidente dentro de este módulo redirige a 'personal'
  {
    path: "**",
    redirectTo: "personal",
  },
];
