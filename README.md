# BipalFront

## 🏗️ Estructura recomendada para máxima modularidad

```
src/app/
├── core/                           # Funcionalidades centrales (NO extraíbles)
│   ├── i18n/                      # ✅ Ya implementado
│   ├── guards/                    # Guardias de rutas
│   ├── interceptors/              # HTTP interceptors
│   ├── services/                  # Servicios globales
│   │   ├── api.service.ts
│   │   ├── notification.service.ts
│   │   └── storage.service.ts
│   ├── models/                    # Interfaces/tipos globales
│   └── utils/                     # Utilidades
│
├── shared/                        # Componentes/pipes/directivas reutilizables
│   ├── components/
│   │   ├── loading/
│   │   ├── modal/
│   │   └── data-table/
│   ├── pipes/
│   └── directives/
│
├── layout/                        # Layout de la aplicación
│   ├── header/
│   ├── sidebar/
│   ├── footer/
│   └── layout.component.ts
│
├── modules/                       # Módulos de funcionalidad (EXTRAÍBLES)
│   ├── auth/                     # 🎯 Módulo completo y auto-contenido
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── models/
│   │   │   └── user.model.ts
│   │   ├── auth.routes.ts
│   │   └── index.ts              # Exportaciones públicas
│   │
│   ├── contratos/                # 🎯 Futuro módulo
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   ├── contratos.routes.ts
│   │   └── index.ts
│   │
│   └── hojadevida/               # 🎯 Módulo existente
│       ├── components/
│       ├── services/
│       ├── models/
│       ├── hojadevida.routes.ts
│       └── index.ts
│
└── app.routes.ts                 # Rutas principales (lazy loading)
```
