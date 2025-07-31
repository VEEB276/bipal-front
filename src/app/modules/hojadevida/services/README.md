# Servicio de Información Personal

Este servicio proporciona métodos para gestionar la información personal de las personas en el sistema de hoja de vida.

## Descripción

El `InformacionPersonalService` es un servicio Angular que facilita las operaciones CRUD (Create, Read, Update, Delete) para la gestión de información personal, incluyendo validaciones y búsquedas específicas.

## Características

- ✅ Operaciones CRUD completas
- ✅ Validación de documentos y correos duplicados
- ✅ Búsqueda por número de documento
- ✅ Manejo de errores HTTP con mensajes descriptivos
- ✅ Configuración centralizada de URL base
- ✅ Tipado fuerte con TypeScript

## Endpoints del Controlador Backend

El servicio está diseñado para interactuar con los siguientes endpoints del controlador backend:

### Endpoints Principales

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/hojadevida/persona/{id}` | Obtener información personal por ID | `id`: number |
| `GET` | `/hojadevida/persona` | Obtener todas las personas | - |
| `POST` | `/hojadevida/persona` | Crear nueva información personal | Body: PersonaCreateDto |
| `PUT` | `/hojadevida/persona/{id}` | Actualizar información personal | `id`: number, Body: PersonaUpdateDto |
| `DELETE` | `/hojadevida/persona/{id}` | Eliminar información personal | `id`: number |

### Endpoints de Búsqueda y Validación

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/hojadevida/persona/buscar/documento/{documento}` | Buscar por número de documento | `documento`: string |
| `GET` | `/hojadevida/persona/validar-documento/{documento}` | Validar si un documento existe | `documento`: string |
| `GET` | `/hojadevida/persona/validar-correo/{correo}` | Validar si un correo existe | `correo`: string (URL encoded) |

## Configuración

### Requisitos Previos

1. **Configuración de Environment**: Asegúrate de que el archivo `environment.ts` tenga configurada la URL del API:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  hojaDeVidaApiUrl: 'https://tu-api-backend.com/api/hojadevida',
  // otras configuraciones...
};
```

2. **HttpClient**: El servicio ya está configurado para usar `HttpClient` que está disponible en `app.config.ts`.

## Uso del Servicio

### Importación

```typescript
import { InformacionPersonalService } from '../services';
// o
import { InformacionPersonalService } from '../services/informacion-personal.service';
```

### Inyección en Componente

```typescript
import { Component } from '@angular/core';
import { InformacionPersonalService } from '../services';

@Component({
  selector: 'app-mi-componente',
  templateUrl: './mi-componente.component.html'
})
export class MiComponente {
  constructor(
    private informacionPersonalService: InformacionPersonalService
  ) {}
}
```

### Métodos Disponibles

#### 1. Crear Nueva Persona

```typescript
crearPersona(): void {
  const nuevaPersona: PersonaCreateDto = {
    primerNombre: 'Juan',
    primerApellido: 'Pérez',
    numeroDocumento: '1234567890',
    // ... otros campos requeridos
  };

  this.informacionPersonalService.crearInformacionPersonal(nuevaPersona)
    .subscribe({
      next: (persona) => {
        console.log('Persona creada:', persona);
        // Manejar éxito
      },
      error: (error) => {
        console.error('Error:', error.message);
        // Manejar error
      }
    });
}
```

#### 2. Obtener Información Personal

```typescript
cargarPersona(id: number): void {
  this.informacionPersonalService.obtenerInformacionPersonal(id)
    .subscribe({
      next: (persona) => {
        console.log('Persona encontrada:', persona);
        // Usar los datos
      },
      error: (error) => {
        console.error('Error al cargar:', error.message);
      }
    });
}
```

#### 3. Actualizar Información

```typescript
actualizarPersona(): void {
  const datosActualizados: PersonaUpdateDto = {
    id: 1,
    primerNombre: 'Juan Carlos',
    // Solo incluir campos que se van a actualizar
  };

  this.informacionPersonalService.actualizarInformacionPersonal(datosActualizados)
    .subscribe({
      next: (persona) => {
        console.log('Persona actualizada:', persona);
      },
      error: (error) => {
        console.error('Error al actualizar:', error.message);
      }
    });
}
```

#### 4. Buscar por Documento

```typescript
buscarPorDocumento(numeroDocumento: string): void {
  this.informacionPersonalService.buscarPorDocumento(numeroDocumento)
    .subscribe({
      next: (persona) => {
        console.log('Persona encontrada:', persona);
      },
      error: (error) => {
        console.error('No encontrado:', error.message);
      }
    });
}
```

#### 5. Validaciones

```typescript
// Validar documento duplicado
validarDocumento(numeroDocumento: string): void {
  this.informacionPersonalService.validarDocumentoExistente(numeroDocumento)
    .subscribe({
      next: (existe) => {
        if (existe) {
          console.log('Documento ya registrado');
        }
      }
    });
}

// Validar correo duplicado
validarCorreo(correo: string): void {
  this.informacionPersonalService.validarCorreoExistente(correo)
    .subscribe({
      next: (existe) => {
        if (existe) {
          console.log('Correo ya registrado');
        }
      }
    });
}
```

## Manejo de Errores

El servicio incluye manejo automático de errores HTTP con mensajes descriptivos:

- **400**: "Datos inválidos. Por favor, revise la información ingresada."
- **401**: "No tiene autorización para realizar esta acción."
- **404**: "La información solicitada no fue encontrada."
- **409**: "Ya existe un registro con estos datos."
- **500**: "Error interno del servidor. Intente más tarde."

## Integración con Componentes

### Ejemplo Completo en un Componente

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformacionPersonalService } from '../services';
import { PersonaDto, PersonaCreateDto } from '../models';

@Component({
  selector: 'app-formulario-persona',
  templateUrl: './formulario-persona.component.html'
})
export class FormularioPersonaComponent implements OnInit {
  personaForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private informacionPersonalService: InformacionPersonalService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.personaForm = this.fb.group({
      primerNombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      // ... otros campos
    });
  }

  onSubmit(): void {
    if (this.personaForm.valid) {
      this.isLoading = true;
      const formData: PersonaCreateDto = this.personaForm.value;
      
      this.informacionPersonalService.crearInformacionPersonal(formData)
        .subscribe({
          next: (persona) => {
            console.log('Éxito:', persona);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error:', error.message);
            this.isLoading = false;
          }
        });
    }
  }
}
```

## Testing

El servicio incluye pruebas unitarias completas. Para ejecutar las pruebas:

```bash
ng test
```

Las pruebas cubren:
- Todas las operaciones CRUD
- Validaciones
- Manejo de errores
- Llamadas HTTP correctas

## Notas Importantes

1. **URL Base**: Asegúrate de configurar correctamente `environment.hojaDeVidaApiUrl`
2. **CORS**: El backend debe permitir las peticiones desde el dominio del frontend
3. **Autenticación**: Si es necesaria, agregar interceptors para tokens de autenticación
4. **Validaciones**: El servicio valida en el frontend, pero el backend también debe validar
5. **Encoding**: Los correos electrónicos se codifican automáticamente para URLs

## Troubleshooting

### Error de CORS
```
Access to XMLHttpRequest at 'https://api...' from origin 'http://localhost:4200' has been blocked by CORS policy
```
**Solución**: Configurar CORS en el backend para permitir el dominio del frontend.

### Error 404 en endpoints
```
Error 404: La información solicitada no fue encontrada
```
**Solución**: Verificar que la URL base en `environment.ts` sea correcta y que el backend esté ejecutándose.

### Errores de validación
```
Error 400: Datos inválidos
```
**Solución**: Verificar que los datos del formulario cumplan con las validaciones del backend.