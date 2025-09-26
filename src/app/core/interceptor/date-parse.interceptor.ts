import { HttpInterceptorFn } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

/**
 * Interceptor que convierte strings YYYY-MM-DD a Date local sin aplicar timezone shift.
 * Se ejecuta ANTES de que Angular convierta automáticamente las fechas.
 */
export const dateParseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map(event => {
      if (event instanceof HttpResponse && event.body) {
        event = event.clone({ body: parseDatesInObject(event.body) });
      }
      return event;
    })
  );
};

function parseDatesInObject(obj: any): any {
  if (!obj) return obj;
  
  if (typeof obj === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(obj)) {
    // YYYY-MM-DD string -> Date local
    const [y, m, d] = obj.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => parseDatesInObject(item));
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = parseDatesInObject(obj[key]);
      }
    }
    return result;
  }
  
  return obj;
}