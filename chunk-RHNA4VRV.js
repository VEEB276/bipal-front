import {
  HOJAVIDA_FEATURE_KEY,
  HojavidaActions,
  Store,
  hojavidaReducer,
  personaPrefetchGuard,
  provideState
} from "./chunk-LXHKEQQO.js";
import "./chunk-EGGHZP6O.js";
import {
  inject
} from "./chunk-NCZTTRTX.js";
import "./chunk-UGR6JUJC.js";

// src/app/modules/hojadevida/guard/desactivate-hoja-vida-form.guard.ts
var deActiveHojaVidaFormGuard = () => {
  const store = inject(Store);
  store.dispatch(HojavidaActions.clearPersona());
  return true;
};

// src/app/modules/hojadevida/hojadevida.routes.ts
var HOJA_DE_VIDA_ROUTES = [
  {
    path: "",
    redirectTo: "personal",
    pathMatch: "full"
  },
  {
    path: "",
    providers: [provideState(HOJAVIDA_FEATURE_KEY, hojavidaReducer)],
    canDeactivate: [deActiveHojaVidaFormGuard],
    children: [
      {
        path: "personal",
        canActivate: [personaPrefetchGuard],
        loadComponent: () => import("./chunk-ZXO2IY7S.js").then((c) => c.SectionContainerHvComponent)
      },
      {
        path: "terminos-condiciones",
        loadComponent: () => import("./chunk-SGNSDAXC.js").then((c) => c.TerminosCondicionesComponent)
      },
      {
        path: "eliminar-datos",
        loadComponent: () => import("./chunk-4J2JI6K6.js").then((c) => c.EliminarDatosComponent)
      }
    ]
  },
  //tiene que ir de final para ser menos IMPORTANTE
  // Ruta comodín: cualquier ruta no coincidente dentro de este módulo redirige a 'personal'
  {
    path: "**",
    redirectTo: "personal"
  }
];
export {
  HOJA_DE_VIDA_ROUTES
};
//# sourceMappingURL=chunk-RHNA4VRV.js.map
