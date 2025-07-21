# Deployment a GitHub Pages

## 🚀 Opciones de Deployment

### Opción 1: HashLocationStrategy (Más Simple)
- ✅ **Pros**: Simple, no requiere configuración adicional
- ❌ **Contras**: URLs con `#` (ej: `miapp.com/#/login`)

### Opción 2: PathLocationStrategy + 404 Redirect (Recomendado)
- ✅ **Pros**: URLs limpias, mejor SEO
- ⚠️ **Contras**: Requiere archivos adicionales

### Opción 3: GitHub Actions (Automático)
- ✅ **Pros**: Deployment automático, URLs limpias
- ⚠️ **Contras**: Requiere configurar Actions

## 📋 Configuración Actual

Este proyecto está configurado para usar la **Opción 2** con los siguientes archivos:

- `public/404.html` - Maneja redirects para URLs directas
- `src/index.html` - Script para procesar redirects
- `angular.json` - Configuración `github-pages` con baseHref
- `.github/workflows/deploy.yml` - GitHub Actions para deployment automático

## 🛠️ Comandos de Build

```bash
# Build normal para producción
pnpm run build

# Build específico para GitHub Pages
pnpm run build:github
```

## 📦 Pasos para Deployment Manual

1. **Build para GitHub Pages:**
   ```bash
   pnpm run build:github
   ```

2. **Los archivos se generan en:** `dist/bipal-front/`

3. **Subir a rama `gh-pages` o configurar en Settings > Pages**

## 🔧 Configuración de GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings > Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages` (si usas Actions) o `main` 
5. Folder: `/ (root)` o `/docs` según tu configuración

## 🌐 URL de tu aplicación

Una vez deployado, tu aplicación estará disponible en:
```
https://[tu-usuario].github.io/bipal-front/
```

## 🔍 Troubleshooting

### Problema: 404 al recargar página
- ✅ Verificar que existe `public/404.html`
- ✅ Verificar script en `src/index.html`
- ✅ Usar configuración `github-pages` en build

### Problema: Recursos no cargan
- ✅ Verificar `baseHref` en `angular.json`
- ✅ Usar rutas relativas en assets

### Problema: Actions no funcionan
- ✅ Verificar permisos en Settings > Actions > General
- ✅ Verificar que la rama main existe
- ✅ Verificar sintaxis del workflow

## 🎯 URLs de Ejemplo

Con la configuración actual:
- ✅ `https://tuusuario.github.io/bipal-front/` (home)
- ✅ `https://tuusuario.github.io/bipal-front/auth/login` (funciona al recargar)
- ✅ `https://tuusuario.github.io/bipal-front/hojadevida` (funciona al recargar)

## 🔄 Cambiar a HashLocationStrategy

Si prefieres la solución más simple:

1. **Modificar `app.config.ts`:**
   ```typescript
   import { provideRouter, withHashLocation } from '@angular/router';
   
   export const appConfig: ApplicationConfig = {
     providers: [
       provideRouter(routes, withHashLocation()),
       // ...otros providers
     ]
   };
   ```

2. **Eliminar archivos de redirect:**
   - `public/404.html`
   - Script de `src/index.html`

3. **URLs resultantes:**
   - `https://tuusuario.github.io/bipal-front/#/auth/login`
   - `https://tuusuario.github.io/bipal-front/#/hojadevida`
