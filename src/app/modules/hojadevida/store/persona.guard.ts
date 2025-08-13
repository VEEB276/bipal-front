import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { InformacionPersonalService } from '../services';
import { Store } from '@ngrx/store';
import { HojavidaActions, selectPersona } from './index';
import { take } from 'rxjs/operators';

export const personaPrefetchGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const servicio = inject(InformacionPersonalService);
  const store = inject(Store);

  const idPersona = auth.session?.user.user_metadata.idPersona;
  if (!idPersona) return true;

  // Verificar si ya está en store
  let alreadyLoaded = false;
  store.select(selectPersona).pipe(take(1)).subscribe(p => {
    alreadyLoaded = !!p && p.id === idPersona;
  });
  if (alreadyLoaded) return true;

  // Dispatch de inicio
  store.dispatch(HojavidaActions.loadPersona({ id: idPersona }));
  servicio.obtenerInformacionPersonal(idPersona).subscribe({
    next: persona => store.dispatch(HojavidaActions.loadPersonaSuccess({ persona })),
    error: err => store.dispatch(HojavidaActions.loadPersonaFailure({ error: err.message || 'Error cargando persona' }))
  });
  return true;
};
