import {
  HOJAVIDA_FEATURE_KEY,
  HojavidaActions,
  hojavidaReducer,
  personaPrefetchGuard
} from "./chunk-GHTUVULG.js";
import {
  Store,
  provideState
} from "./chunk-JOCNUMAS.js";
import "./chunk-EGGHZP6O.js";
import {
  inject
} from "./chunk-52XVDXSC.js";
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
        loadComponent: () => import("./chunk-GKAORRDS.js").then((c) => c.SectionContainerHvComponent)
      },
      {
        path: "terminos-condiciones",
        loadComponent: () => import("./chunk-2FCTFI4L.js").then((c) => c.TerminosCondicionesComponent)
      },
      {
        path: "eliminar-datos",
        loadComponent: () => import("./chunk-AVVVCPVG.js").then((c) => c.EliminarDatosComponent)
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
//# sourceMappingURL=chunk-PC2JELJK.js.map
