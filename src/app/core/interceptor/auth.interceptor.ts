import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

/**
 * Interceptor que maneja el loading automático para peticiones POST
 * Muestra un spinner de carga durante las peticiones POST y lo oculta al finalizar
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  // Solo aplicar loading para peticiones POST
  if (req.method === 'POST') {
    // Mostrar loading antes de enviar la petición
    loadingService.show();
    
    return next(req).pipe(
      finalize(() => {
        // Ocultar loading cuando la petición termine (éxito o error)
        loadingService.hide();
      })
    );
  }
  
  // Para otros métodos HTTP, continuar sin loading
  return next(req);
};
