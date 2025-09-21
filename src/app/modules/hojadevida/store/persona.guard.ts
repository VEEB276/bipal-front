import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "../../../core/auth/auth.service";
import { InformacionPersonalService } from "../services";
import { Store } from "@ngrx/store";
import { HojavidaActions, selectPersona } from "./index";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { from, of } from "rxjs";
import { NotificationService } from "../../../core/services";

export const personaPrefetchGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const servicio = inject(InformacionPersonalService);
  const store = inject(Store);
  const notify = inject(NotificationService);

  const prefetchConId = (id: number) => {
    // Verificar si ya está en store
    const person = store.selectSignal(selectPersona)();
    const alreadyLoaded = !!person && person.id === id;
    if (alreadyLoaded) return of(true);

    // Dispatch de inicio
    store.dispatch(HojavidaActions.loadPersona({ id }));
    return servicio.obtenerInformacionPersonal(id).pipe(
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
        return from(auth.signOut()).pipe(map(() => false));
      }), // En caso de error, deslogear
      map(() => true)
    );
  };

  const idPersona = auth.session?.user.user_metadata?.idPersona as
    | number
    | undefined;
  console.log("PersonaGuard, idPersona from metadata:", idPersona);
  if (idPersona) {
    return prefetchConId(idPersona);
  }

  // Si no hay idPersona, refrescar user desde Supabase para evitar cache desactualizada
  return from(
    auth
      .ensureSessionLoaded()
      .then(() => auth.reloadUser())
      .then(() => auth.session?.user.user_metadata?.idPersona as number | undefined)
  ).pipe(
    switchMap((id) => (id ? prefetchConId(id) : of(true)))
  );
};
