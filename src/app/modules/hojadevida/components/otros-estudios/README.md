# Componente de Otros Estudios

Este componente permite a los usuarios gestionar información sobre cursos adicionales o estudios complementarios que no forman parte de la formación académica formal.

## Características

- Permite agregar múltiples estudios adicionales
- Cada estudio incluye:
  - Nombre del curso
  - Estado de graduación (Sí/No)
  - Número de horas del curso
  - Institución educativa donde se cursó
- Posibilidad de no tener ningún estudio adicional
- Validación de formularios

## Uso

```html
<app-otros-estudios></app-otros-estudios>
```

## Interfaces

```typescript
export interface OtroEstudio {
  nombreCurso: string;
  graduado: string;
  numeroHoras: number;
  institucionEducativa: string;
}

export interface GraduadoOption {
  value: string;
  label: string;
}
```
