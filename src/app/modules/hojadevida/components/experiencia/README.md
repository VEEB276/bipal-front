# Componente de Experiencia

Este componente permite a los usuarios gestionar su experiencia laboral, académica, profesional o de investigación.

## Características

- Permite agregar múltiples experiencias
- Cada experiencia incluye:
  - Perfil profesional (descripción detallada con máximo 800 caracteres)
  - Tipo de experiencia (laboral, profesional, académica, investigación)
  - Nombre de la empresa
  - Nombre del cargo
  - Dependencia donde se desempeñó
  - Indicador de si es el trabajo actual
  - Fechas de inicio y retiro (esta última se deshabilita si es trabajo actual)
- Validación completa de formularios
- Diseño responsivo con Material Design

## Uso

```html
<app-experiencia></app-experiencia>
```

## Interfaces

```typescript
export interface Experiencia {
  perfilProfesional: string;
  tipoExperiencia: string;
  nombreEmpresa: string;
  nombreCargo: string;
  dependencia: string;
  esTrabajoActual: string;
  fechaInicio: string;
  fechaRetiro: string;
}
```
