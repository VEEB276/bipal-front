import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideStore } from "@ngrx/store";
import { hojavidaReducer, HOJAVIDA_FEATURE_KEY } from './modules/hojadevida/store/feature/hojavida.reducer';
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { routes } from "./app.routes";
import { I18N_PROVIDERS } from "./core/i18n";
import { authInterceptor } from "./core/interceptor/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  provideStore({ [HOJAVIDA_FEATURE_KEY]: hojavidaReducer }),
    provideEffects([]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    ...I18N_PROVIDERS,
  ],
};
