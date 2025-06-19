# Sistema de Internacionalización (i18n)

Este módulo proporciona un sistema completo de internacionalización para la aplicación usando `ngx-translate`.

## 📁 Estructura

```
src/app/core/i18n/
├── i18n.service.ts              # Servicio principal de traducción
├── i18n.config.ts               # Configuración y providers
├── app-translate.pipe.ts        # Pipe personalizado
├── language-selector.component.ts # Componente selector de idioma
└── index.ts                     # Archivo de exportación

src/assets/i18n/
└── es.json                      # Archivo de traducciones en español
```

## 🚀 Uso

### 1. En Componentes

```typescript
import { Component } from '@angular/core';
import { I18nService } from './core/i18n';

@Component({
  selector: 'app-example',
  template: `
    <h1>{{ getWelcomeMessage() }}</h1>
    <p>{{ 'COMMON.LOADING' | translate }}</p>
  `
})
export class ExampleComponent {
  constructor(private i18nService: I18nService) {}

  getWelcomeMessage(): string {
    return this.i18nService.translate('COMMON.WELCOME');
  }
}
```

### 2. En Templates

#### Usando el pipe de ngx-translate:
```html
<!-- Traducción simple -->
<h1>{{ 'COMMON.WELCOME' | translate }}</h1>

<!-- Con parámetros -->
<p>{{ 'FORMS.VALIDATION.MIN_LENGTH' | translate: {min: 5} }}</p>

<!-- Con parámetros dinámicos -->
<span>{{ 'COMMON.HELLO' | translate: {name: userName} }}</span>
```

#### Usando el pipe personalizado (con fallback):
```html
<!-- Con texto de respaldo -->
<h1>{{ 'COMMON.WELCOME' | appTranslate: null : 'Bienvenido' }}</h1>

<!-- Con parámetros y fallback -->
<p>{{ 'USER.GREETING' | appTranslate: {name: userName} : 'Hola usuario' }}</p>
```

### 3. Selector de Idioma

```html
<!-- Incluir en cualquier template -->
<app-language-selector></app-language-selector>
```

### 4. En Servicios

```typescript
import { Injectable } from '@angular/core';
import { I18nService } from '../core/i18n';

@Injectable()
export class MyService {
  constructor(private i18nService: I18nService) {}

  showMessage(): void {
    const message = this.i18nService.translate('MESSAGES.SAVE_SUCCESS');
    console.log(message);
  }

  async getAsyncTranslation(): Promise<string> {
    return this.i18nService.translateAsync('COMMON.LOADING').toPromise();
  }
}
```

## 🔧 Métodos del I18nService

| Método | Descripción | Ejemplo |
|--------|-------------|---------|
| `translate(key, params?)` | Traducción síncrona | `translate('COMMON.WELCOME')` |
| `translateAsync(key, params?)` | Traducción asíncrona | `translateAsync('COMMON.LOADING')` |
| `translateMultiple(keys, params?)` | Múltiples traducciones | `translateMultiple(['COMMON.YES', 'COMMON.NO'])` |
| `changeLanguage(lang)` | Cambiar idioma | `changeLanguage('en')` |
| `getCurrentLanguage()` | Obtener idioma actual | `getCurrentLanguage()` |
| `getAvailableLanguages()` | Idiomas disponibles | `getAvailableLanguages()` |
| `hasTranslation(key)` | Verificar si existe traducción | `hasTranslation('COMMON.WELCOME')` |
| `reloadTranslations(lang?)` | Recargar traducciones | `reloadTranslations()` |

## 📝 Agregar Nuevas Traducciones

### 1. Editar el archivo de traducciones:
```json
// src/assets/i18n/es.json
{
  "NEW_SECTION": {
    "TITLE": "Nuevo Título",
    "DESCRIPTION": "Nueva descripción con {{parameter}}"
  }
}
```

### 2. Usar en el código:
```typescript
// En componente
this.i18nService.translate('NEW_SECTION.TITLE');

// En template
{{ 'NEW_SECTION.DESCRIPTION' | translate: {parameter: 'valor'} }}
```

## 🌐 Agregar Nuevos Idiomas

### 1. Crear archivo de traducción:
```bash
# Crear archivo para inglés
src/assets/i18n/en.json
```

### 2. Actualizar configuración:
```typescript
// src/app/core/i18n/i18n.config.ts
export const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];
```

## 🎯 Buenas Prácticas

1. **Estructura de claves**: Usa una jerarquía clara
   ```json
   {
     "MODULE": {
       "COMPONENT": {
         "ACTION": "Texto"
       }
     }
   }
   ```

2. **Nombres descriptivos**: Usa nombres que indiquen el contexto
   ```json
   {
     "FORMS": {
       "VALIDATION": {
         "EMAIL_REQUIRED": "El email es requerido"
       }
     }
   }
   ```

3. **Parámetros consistentes**: Usa nombres claros para parámetros
   ```json
   {
     "USER_GREETING": "Hola {{userName}}, tienes {{messageCount}} mensajes"
   }
   ```

4. **Fallbacks**: Siempre proporciona textos de respaldo
   ```html
   {{ 'OPTIONAL.KEY' | appTranslate: null : 'Texto por defecto' }}
   ```

## 🔍 Troubleshooting

### Problema: Traducción no aparece
- Verificar que la clave existe en el archivo JSON
- Revisar la sintaxis de la clave
- Usar `hasTranslation()` para debuggear

### Problema: Parámetros no se interpolan
- Verificar que los nombres de parámetros coinciden
- Usar dobles llaves en JSON: `{{parameter}}`

### Problema: Idioma no cambia
- Verificar que el archivo de traducción existe
- Revisar que el código de idioma está en `SUPPORTED_LANGUAGES`
