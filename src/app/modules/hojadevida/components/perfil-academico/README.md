# Perfil Académico Component

Componente standalone de Angular Material v19 para gestionar información académica de una persona.

## Características

- ✅ Componente standalone (sin necesidad de módulos)
- ✅ Formularios reactivos con validación
- ✅ Interfaz basada en Angular Material v19
- ✅ Soporte para múltiples títulos académicos
- ✅ Slider para número de semestres
- ✅ Responsive design
- ✅ Validación de campos requeridos
- ✅ Eliminación de títulos con confirmación

## Uso

### Importar el componente

```typescript
import { PerfilAcademicoComponent } from './path/to/perfil-academico.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [PerfilAcademicoComponent],
  template: `<app-perfil-academico></app-perfil-academico>`
})
export class ExampleComponent {}
```

### Estructura de datos

```typescript
interface PerfilAcademico {
  titulos: TituloAcademico[];
}

interface TituloAcademico {
  tituloAcademico: string;
  graduado: 'si' | 'no';
  nivelEducativo: 'tecnico' | 'tecnologo' | 'profesional' | 'especializacion' | 'maestria' | 'doctorado' | 'bachiller';
  institucionEducativa: string;
  semestresAprobados: number;
}
```

## Funcionalidades

### Campos por título académico

1. **Título Académico** (requerido)
   - Texto libre
   - Máximo 255 caracteres

2. **Graduado** (requerido)
   - Opciones: Sí / No

3. **Nivel Educativo** (requerido)
   - Técnico, Tecnólogo, Profesional, Especialización, Maestría, Doctorado, Bachiller

4. **Institución Educativa** (requerido)
   - Texto libre
   - Máximo 255 caracteres

5. **Número de Semestres Aprobados** (requerido)
   - Slider de 0 a 16 semestres

### Acciones

- **Agregar Título**: Permite añadir múltiples títulos académicos
- **Eliminar Título**: Permite remover títulos (mínimo 1 título requerido)
- **Guardar**: Envía el formulario completo
- **Cancelar**: Cancela la edición

## Validaciones

- Todos los campos marcados como requeridos deben ser completados
- Los campos de texto tienen límites de caracteres
- El número de semestres debe estar entre 0 y 16
- No se puede eliminar el último título (mínimo 1 requerido)

## Estilos

El componente utiliza el tema de colores personalizado:
- Color principal: `#2c5530` (verde)
- Color de fondo: `#f8f9fa` (gris claro)
- Bordes: `#e0e0e0` (gris)

## Responsive

El componente es completamente responsive y se adapta a:
- Desktop (>768px)
- Tablet (768px - 480px)
- Mobile (<480px)

## Dependencias

- Angular Material v19
- Angular Reactive Forms
- Angular Common

## Testing

El componente incluye pruebas unitarias que cubren:
- Creación del componente
- Adición y eliminación de títulos
- Validación de formularios
- Funcionalidad del slider
- Casos edge
