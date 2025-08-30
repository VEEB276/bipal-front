import { Routes } from "@angular/router";
import {
  HOJAVIDA_FEATURE_KEY,
  hojavidaReducer,
  personaPrefetchGuard,
} from "./store";
import { provideState } from "@ngrx/store";
import { deActiveHojaVidaFormGuard } from "./guard/desactivate-hoja-vida-form.guard";

export const HOJA_DE_VIDA_ROUTES: Routes = [
  {
    path: "",
    redirectTo: "personal",
    pathMatch: "full",
  },
  {
    path: "",
    providers: [provideState(HOJAVIDA_FEATURE_KEY, hojavidaReducer)],
    canDeactivate: [deActiveHojaVidaFormGuard],
    children: [
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
          import(
            "./pages/terminos-condiciones/terminos-condiciones.component"
          ).then((c) => c.TerminosCondicionesComponent),
      },
      {
        path: "eliminar-datos",
        loadComponent: () =>
          import("./pages/eliminar-datos/eliminar-datos.component").then(
            (c) => c.EliminarDatosComponent
          ),
      },
    ],
  },
  //tiene que ir de final para ser menos IMPORTANTE
  // Ruta comodín: cualquier ruta no coincidente dentro de este módulo redirige a 'personal'
  {
    path: "**",
    redirectTo: "personal",
  },
];
