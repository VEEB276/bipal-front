# Servicio de Información Personal - Guía de Uso

## 🚀 Inicio Rápido

### 1. Instalación de Dependencias
```bash
pnpm install
```

### 2. Configuración del API Backend
Edita el archivo `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://your-supabase-url.supabase.co',
  supabaseKey: 'your-supabase-anon-key',
  hojaDeVidaApiUrl: 'https://tu-api-backend.com/api', // 👈 Actualiza esta URL
};
```

### 3. Ejecutar el Proyecto
```bash
pnpm start
```
La aplicación estará disponible en `http://localhost:4201`

## 📱 Navegación al Componente

Una vez que la aplicación esté ejecutándose:

1. Ve a `http://localhost:4201`
2. Navega a la sección de "Hoja de Vida"
3. Selecciona "Información Personal"

## 🎯 Funcionalidades Implementadas

### En el Formulario de Información Personal:

1. **Búsqueda por Documento**: 
   - Ingresa un número de documento
   - Haz clic en "Buscar por Documento"
   - Si existe, carga automáticamente la información

2. **Creación de Nueva Persona**:
   - Haz clic en "Nueva Persona" para limpiar el formulario
   - Llena todos los campos requeridos
   - Haz clic en "Guardar"

3. **Actualización**:
   - Carga una persona existente (por búsqueda)
   - Modifica los campos necesarios
   - Haz clic en "Actualizar"

4. **Validaciones en Tiempo Real**:
   - Al perder el foco en "Número de Documento": valida si ya existe
   - Al perder el foco en "Correo Electrónico": valida si ya existe

## 🔗 Endpoints del Backend

El servicio espera que el backend tenga los siguientes endpoints:

### Operaciones CRUD
- `GET /persona/{id}` - Obtener persona por ID
- `GET /persona` - Obtener todas las personas
- `POST /persona` - Crear nueva persona
- `PUT /persona/{id}` - Actualizar persona
- `DELETE /persona/{id}` - Eliminar persona

### Búsquedas y Validaciones
- `GET /persona/buscar/documento/{documento}` - Buscar por documento
- `GET /persona/validar-documento/{documento}` - Validar si documento existe
- `GET /persona/validar-correo/{correo}` - Validar si correo existe

## 📝 Estructura de Datos (PersonaDto)

```typescript
{
  "id": 1,
  "idTipoDocumento": 1, // 1=CC, 2=CE, 3=TI, 4=Pasaporte
  "numeroDocumento": "1234567890",
  "fechaExpedicionDocumento": "2020-01-01T00:00:00.000Z",
  "idGenero": 1, // 1=Masculino, 2=Femenino, 3=Otro
  "idEnfoqueDiferencial": 1, // 1=Ninguno, 2=Afro, 3=Indígena, etc.
  "primerNombre": "Juan",
  "segundoNombre": "Carlos",
  "primerApellido": "Pérez",
  "segundoApellido": "García",
  "fechaNacimiento": "1990-05-15T00:00:00.000Z",
  "lugarNacimiento": "Medellín, Antioquia",
  "departamentoResidencia": "Antioquia",
  "ciudadResidencia": "Medellín",
  "direccionResidencia": "Calle 123 #45-67",
  "numeroTelefono": "3001234567",
  "correoElectronico": "juan.perez@email.com",
  "nombreContacto": "María García",
  "numeroTelefonoContacto": "3009876543",
  "correoElectronicoContacto": "maria.garcia@email.com"
}
```

## 🧪 Testing

### Ejecutar Tests del Servicio
```bash
pnpm test
```

### Tests Incluidos
- ✅ Creación de información personal
- ✅ Obtención por ID
- ✅ Actualización
- ✅ Búsqueda por documento
- ✅ Validación de documento existente
- ✅ Validación de correo existente
- ✅ Manejo de errores HTTP

## 🔧 Desarrollo

### Build de Desarrollo
```bash
pnpm run ng build --configuration=development
```

### Build de Producción
```bash
pnpm run build
```

### Modo Watch (desarrollo continuo)
```bash
pnpm run watch
```

## 🚨 Troubleshooting

### Error: Cannot connect to backend
1. Verifica que la URL en `environment.ts` sea correcta
2. Asegúrate de que el backend esté ejecutándose
3. Verifica la configuración de CORS en el backend

### Error: CORS blocked
El backend debe incluir headers CORS para el puerto 4201:
```
Access-Control-Allow-Origin: http://localhost:4201
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Mensajes de Error del Servicio
- **400**: Datos inválidos - revisar validaciones de formulario
- **404**: Información no encontrada - verificar que el ID/documento exista
- **409**: Registro duplicado - documento o correo ya registrado
- **500**: Error del servidor - verificar logs del backend

## 📚 Recursos Adicionales

- **Documentación del Servicio**: `src/app/modules/hojadevida/services/README.md`
- **Tests del Servicio**: `src/app/modules/hojadevida/services/informacion-personal.service.spec.ts`
- **Modelos de Datos**: `src/app/modules/hojadevida/models/persona.dto.ts`

## 🎨 Características de UI/UX

- **Diseño Responsivo**: Se adapta a móvil, tablet y desktop
- **Material Design**: Usa Angular Material para consistencia visual
- **Validaciones en Tiempo Real**: Feedback inmediato al usuario
- **Estados de Carga**: Indicadores visuales durante las peticiones HTTP
- **Mensajes de Error**: Notificaciones claras con Snackbar
- **Accesibilidad**: Cumple con estándares de accesibilidad web