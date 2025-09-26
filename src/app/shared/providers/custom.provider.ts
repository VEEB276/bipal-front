import { Provider } from '@angular/core';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, ErrorStateMatcher } from '@angular/material/core';
import { EsCoDateAdapter } from '../../core/date/custom-date-adapter';
import { ES_CO_DATE_FORMATS } from '../../core/date/date-formats';
import { ControlTouchedErrorStateMatcher } from '../utils/CustomControlStateMatcher';

/**
 * Proveedores reutilizables para módulos/ componentes de Hoja de Vida
 * Centraliza locales y adaptadores de fecha y el ErrorStateMatcher custom.
 */
export const HOJA_DE_VIDA_PROVIDERS: Provider[] = [
  { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
  { provide: DateAdapter, useClass: EsCoDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: ES_CO_DATE_FORMATS },
  { provide: ErrorStateMatcher, useClass: ControlTouchedErrorStateMatcher }
];
