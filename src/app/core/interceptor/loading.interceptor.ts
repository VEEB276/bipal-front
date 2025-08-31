import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HttpGetLoadingService } from '../services/http-get-loading.service';

// Interceptor para mostrar barra superior sólo en peticiones GET
export const getLoadingInterceptor: HttpInterceptorFn = (req, next) => {
	if (req.method !== 'GET' || req.headers.has('x-disable-get-loading')) {
		return next(req);
	}
	const svc = inject(HttpGetLoadingService);
	svc.show();
	return next(req).pipe(finalize(() => svc.hide()));
};
