import { inject } from "@angular/core";
import { CanActivateFn, createUrlTreeFromSnapshot } from "@angular/router";
import { AuthService } from "../../../core/auth/auth.service";
import { InformacionPersonalService } from "../services";
import { Store } from "@ngrx/store";
import { HojavidaActions, selectPersona } from "./index";
import { catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { NotificationService } from "../../../core/services";

export const personaPrefetchGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const servicio = inject(InformacionPersonalService);
  const store = inject(Store);
  const notify = inject(NotificationService);

  const idPersona = auth.session?.user.user_metadata.idPersona;
  if (!idPersona) return true;

  // Verificar si ya está en store
  let alreadyLoaded = false;
  const person = store.selectSignal(selectPersona)();
  alreadyLoaded = !!person && person.id === idPersona;
  if (alreadyLoaded) return true;

  // Dispatch de inicio
  store.dispatch(HojavidaActions.loadPersona({ id: idPersona }));
  return servicio.obtenerInformacionPersonal(idPersona).pipe(
    tap({
      next: (persona) =>
        store.dispatch(HojavidaActions.loadPersonaSuccess({ persona })),
      error: (err) =>
        store.dispatch(
          HojavidaActions.loadPersonaFailure({
            error: err.message || "Error cargando persona",
          })
        ),
    }),
    catchError(() => {
      notify.showError(
        "No fue posible cargar la información personal, por favor contacte al administrador."
      );
      return auth.signOut();
    }), // En caso de error, deslogear
    map(() => true)
  );
};
