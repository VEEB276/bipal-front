import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { routes } from "./app.routes";
import { I18N_PROVIDERS } from "./core/i18n";
import { authInterceptor } from "./core/interceptor/auth.interceptor";
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { EsCoDateAdapter } from "./core/date/custom-date-adapter";
import { ES_CO_DATE_FORMATS } from "./core/date/date-formats";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({}),
    provideEffects([]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
  { provide: DateAdapter, useClass: EsCoDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: ES_CO_DATE_FORMATS },
    ...I18N_PROVIDERS,
  ],
};
