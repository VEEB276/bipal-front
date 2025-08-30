import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { HojavidaActions } from "../store";
import { CanDeactivateFn } from "@angular/router";

/**
 * Este simple guard permite que al salirse de la negacion de las rutas de hoja de vida
 * se limpie el store y asi se evite problemas de data cruzada.
 */
export const deActiveHojaVidaFormGuard: CanDeactivateFn<any> = () => {
  const store = inject(Store);
  store.dispatch(HojavidaActions.clearPersona());
  return true;
};
