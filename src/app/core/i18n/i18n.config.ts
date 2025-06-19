import { HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Factory function para crear el loader de traducciones
 * @param http HttpClient para cargar archivos
 * @returns TranslateHttpLoader configurado
 */
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * Configuración de providers para ngx-translate
 * Incluye todas las configuraciones necesarias para el sistema de traducción
 */
export const I18N_PROVIDERS = [
  importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'es',
      useDefaultLang: true,
      isolate: false
    })
  )
];

/**
 * Configuración de idiomas soportados por la aplicación
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  // Agregar más idiomas según necesidades
  // { code: 'en', name: 'English', flag: '🇺🇸' },
  // { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

/**
 * Idioma por defecto de la aplicación
 */
export const DEFAULT_LANGUAGE = 'es';
