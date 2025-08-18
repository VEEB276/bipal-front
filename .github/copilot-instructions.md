# AI Agent Instructions for BipalFront

Concise, project-specific guidance to be productive quickly. Follow these patterns; don't invent new structures unless justified.

## 1. Arquitectura & Organización
- Angular 17+ con componentes standalone (no NgModules) y Angular Material v19.
- Estructura clave:
  - `src/app/core`: servicios globales (auth, loading, notification, i18n, interceptors), utilidades y modelos compartidos.
  - `src/app/modules/hojadevida`: funcionalidades de hoja de vida (componentes de información personal, perfil académico, otros estudios, experiencia, servicios y DTOs).
  - `src/assets/i18n`: archivos de traducción (`es.json`).
  - `public/` y `src/index.html`: bootstrap de la app.
- Patrón: cada feature grande se diseña para ser potencialmente extraíble (standalone + rutas lazy en `app.routes.ts`).

## 2. Autenticación & Sesión
- Supabase se usa para auth; la sesión se accede vía `AuthService` (`auth.session`).
- Después de crear una persona se debe sincronizar `idPersona` en metadata (método `updatePersonaId`).
- Interceptor (`core/interceptor/auth.interceptor.ts`) añade header `user-id` si hay sesión y muestra loading para métodos mutadores: POST, PUT y DELETE.
- Al agregar headers extras, usar `req.clone({ setHeaders: { ... } })` antes de la lógica de loading.

## 3. Servicios HTTP & Convenciones
- Servicios en `modules/hojadevida/services/` consumen endpoints REST Spring Boot (`/api/persona/...`).
- Rutas actuales estandarizadas: `find-by-id-persona/{id}`, `create-persona`, `actualizar-persona`.
- Métodos no implementados marcados con comentarios `TODO:`; no los uses para nueva lógica sin backend existente.
- Manejo de errores: centralizado en cada servicio con `handleError` que mapea códigos a mensajes de usuario; reutiliza patrón en lugar de `catch` ad-hoc.

## 4. Formularios Reactivos
- Formularios construidos en `ngOnInit` antes de cualquier `patchValue` (asegurar orden correcto).
- Selects: usar valores numéricos con `[value]="n"` cuando el DTO define `number` (evitar strings que rompen selección al patch).
- Reglas de validación comunes: `required`, `maxLength`, patrones de teléfono (`/^\d{10}$/`). Reutiliza existentes para consistencia.
- Utilidad de acceso a controles: método `control(name)` en lugar de múltiples getters; no reintroducir getters eliminados.

## 5. DTOs & Modelos
- DTO principal: `modules/hojadevida/models/persona.dto.ts` (alineado con backend). Nombres exactos: `fechaExpedicionDoc`, `telefono`, `correo`, `telefonoContacto`, `correoContacto`, `idHojaVida`.
- Crear variantes: `CreateDto` = `Omit<Dto,'id'>`; `UpdateDto` = `Partial<CreateDto> & { id: number }`.
- Mantén tipos de fechas como `Date` en front; convierte al formato requerido por backend antes de enviar si se cambia el contrato.

## 6. UI / Angular Material
- Usa componentes Material nativos; no crear wrappers salvo patrón repetido claro.
- Tema personalizado en `src/styles/_variables.scss` y overrides en `styles/_theme_overrides.scss`.
- Mantén consistencia de apariencia reutilizando clases como `form-row`, `form-field`, etc.

## 7. Testing
- Pruebas existentes muestran cómo mockear HttpClient (ver `informacion-personal.service.spec.ts`). Copiar estructura para nuevos servicios.
- Asegura que las rutas esperadas en pruebas coincidan con las realmente configuradas (evita hardcode desactualizado).

## 8. Interceptores & Loading
- Loading global aplicado a POST, PUT y DELETE (mutaciones). Para GET no se muestra spinner.
- Para desactivar loading en una mutación futura puede agregarse (patrón sugerido) header `x-disable-loading: 'true'` y chequearlo antes de `show()`.
- Añade nuevos headers antes de condicional del loading para no perder el clon.

## 9. Estándares de Código
- Comentarios de tareas pendientes: usa `TODO:` para señalar código pendiente; limpia o implementa antes de cerrar PRs grandes.
- Preferir composición funcional y early returns (ej: validar `personaId` antes de construir payload en updates).
- Evitar repetir lógica de transformación; crear helper en `core/utils` si se repite 3+ veces.
- Subscriptions en componentes: usar forma corta `observable.subscribe(() => { ... })` por defecto. No introducir `{ next: ..., error: ... }` a menos que haya manejo de `complete` o múltiples callbacks necesarios. Errores ya se notifican en el servicio (snackbar) mediante `handleError`.
- Control flow Angular: siempre usar las nuevas sintaxis `@if`, `@for`, `@switch` en lugar de `*ngIf` y `*ngFor`. No introducir directivas estructurales legacy en nuevo código; migrar cuando se toquen archivos.

## 10. Flujo Persona (end-to-end)
1. Usuario autenticado (Supabase) -> metadata puede traer `idPersona`.
2. Si `idPersona` existe: se llama `obtenerInformacionPersonal(id)` y se hace `patchValue` al formulario.
3. Si no existe: usuario llena formulario y se llama `crearInformacionPersonal`; respuesta incluye `id`; luego `auth.updatePersonaId(id)` para persistirlo.
4. Actualizaciones posteriores usan `actualizarInformacionPersonal` con DTO parcial.

## 11. Errores Comunes Detectados
- Selects que no muestran valor tras `patchValue`: mismatch tipo (string vs number) o se patch antes de `buildForm`.
- Fechas que fallan: Backend espera string/ISO, front envía `Date` sin serializar — convertir con `toISOString().split('T')[0]` si necesario.
- Rutas desalineadas: Cambios en controller backend requieren actualizar tests y servicio simultáneamente.

## 12. Cómo Proponer Cambios Automatizados
- Leer archivo antes de editar; aplicar patch mínimo (no reformatear todo).
- Tras modificar servicio o DTO, revisar specs relacionadas y actualizarlas en el mismo commit para mantener verde.
- Añadir nuevos servicios con patrón: `private baseUrl = environment.hojaDeVidaApiUrl + '/recurso';` + métodos CRUD + `handleError` reutilizable.

## 13. Comandos Clave (asumidos)
- Iniciar dev: `pnpm start`
- Build: `pnpm build` (si definido en `package.json`).
- Tests: `pnpm test` (adaptar a configuración real si difiere).

## 14. Cuándo Pedir Clarificación
- Si backend aún no expone endpoint (marcado con TODO) y se solicita lógica dependiente.
- Si formato de fechas / enums cambia sin evidencia en código existente.

---
Proporciona feedback si falta algún patrón crítico o si deseas más detalle en una sección específica.
