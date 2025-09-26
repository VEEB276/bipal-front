import {
  ApplicationConfig,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { routes } from "./app.routes";
import { I18N_PROVIDERS } from "./core/i18n";
import { authInterceptor } from "./core/interceptor/auth.interceptor";
import { dateParseInterceptor } from "./core/interceptor/date-parse.interceptor";
import { getLoadingInterceptor } from "./core/interceptor/loading.interceptor";
import { provideNativeDateAdapter } from "@angular/material/core";
import { ES_CO_DATE_FORMATS } from "./core/date/date-formats";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        dateParseInterceptor,
        getLoadingInterceptor,
      ])
    ),
    provideStore({}),
    provideEffects([]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    // ...provideCustomDateAdapter(),
    // provideNativeDateAdapter(ES_CO_DATE_FORMATS),
    // provideMomentDateAdapter(MY_DATE_FORMATS)
    ...I18N_PROVIDERS,
  ],
};
