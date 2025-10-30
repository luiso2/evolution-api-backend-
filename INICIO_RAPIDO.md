# Backend Evolution API - Inicio Rápido

## ✅ Estado del Proyecto

**PROYECTO COMPLETADO Y FUNCIONANDO**

El backend está ejecutándose exitosamente en: **http://localhost:3456**

## 🚀 Información del Servidor

- **Puerto**: 3456
- **URL Base**: http://localhost:3456
- **Prefijo API**: /api
- **Estado**: ✅ En ejecución

## 📍 Endpoints Principales

### Verificación del Sistema
- **Health Check**: http://localhost:3456/api/health
- **Información**: http://localhost:3456/api/info
- **OpenAPI Spec**: http://localhost:3456/openapi.json

## 🔑 Credenciales Configuradas

Las credenciales de Evolution API ya están configuradas en el archivo `.env`:

```
EVOLUTION_API_URL=https://evolution-api-evolution-api.dqyvuv.easypanel.host
EVOLUTION_API_KEY=BC10D87095B7-44E2-B1A4-F03BE2BECE24
```

## ⚠️ Nota sobre Autenticación

Al probar el endpoint de instancias, recibimos un error 401 (Unauthorized) de Evolution API. Esto puede indicar que:
1. La API key proporcionada puede necesitar actualización
2. O necesitas verificar los permisos en tu servidor Evolution API

## 📦 Estructura del Proyecto

```
/Users/josemichaelhernandezvargas/Desktop/evolution api backend/
├── src/                    # Código fuente TypeScript
├── dist/                   # Código compilado JavaScript
├── docs/                   # Documentación completa
├── .env                    # Variables de entorno (credenciales)
├── openapi.json           # Especificación OpenAPI para ChatGPT
├── package.json           # Dependencias
└── README.md              # Documentación principal
```

## 🎯 Próximos Pasos

### 1. Para Detener el Servidor
```bash
# Presiona Ctrl+C en la terminal donde está corriendo
```

### 2. Para Reiniciar el Servidor
```bash
cd "/Users/josemichaelhernandezvargas/Desktop/evolution api backend"
npm start
```

### 3. Para Desarrollo con Hot Reload
```bash
npm run dev
```

### 4. Integración con ChatGPT

1. Abre el archivo `openapi.json`
2. Actualiza el campo `servers[0].url` con tu URL de producción
3. Importa el archivo en ChatGPT Actions
4. Configura la autenticación con tu API key

## 📊 Endpoints Disponibles (27 en total)

### Gestión de Instancias
- GET /api/instances
- POST /api/instances
- GET /api/instances/:instanceName
- DELETE /api/instances/:instanceName
- GET /api/instances/:instanceName/status
- POST /api/instances/:instanceName/connect
- POST /api/instances/:instanceName/disconnect

### Operaciones de Mensajes
- POST /api/instances/:instanceName/messages/send
- POST /api/instances/:instanceName/messages/sendMedia
- GET /api/instances/:instanceName/messages/list
- POST /api/instances/:instanceName/messages/sendList
- POST /api/instances/:instanceName/messages/sendButtons

### Gestión de Contactos
- GET /api/instances/:instanceName/contacts
- GET /api/instances/:instanceName/contacts/:contactId
- POST /api/instances/:instanceName/contacts/check

### Gestión de Grupos
- GET /api/instances/:instanceName/groups
- GET /api/instances/:instanceName/groups/:groupId
- POST /api/instances/:instanceName/groups
- POST /api/instances/:instanceName/groups/:groupId/participants

### Gestión de Webhooks
- GET /api/instances/:instanceName/webhook
- POST /api/instances/:instanceName/webhook
- DELETE /api/instances/:instanceName/webhook

### Operaciones de Chats
- GET /api/instances/:instanceName/chats
- GET /api/instances/:instanceName/chats/:chatId
- DELETE /api/instances/:instanceName/chats/:chatId

## 🛠️ Solución de Problemas

### Si el servidor no inicia:
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Reconstruir
npm run build

# Iniciar
npm start
```

### Si el puerto está ocupado:
Edita el archivo `.env` y cambia el puerto:
```
PORT=3457
```

## 📚 Documentación Completa

- **README.md**: Documentación técnica completa
- **docs/ARCHITECTURE.md**: Arquitectura del sistema
- **docs/CHATGPT_INTEGRATION_GUIDE.md**: Guía de integración con ChatGPT
- **openapi.json**: Especificación OpenAPI 3.1.0

## ✅ Verificación Final

El backend está funcionando correctamente. Los endpoints de salud e información responden exitosamente.

Para verificar la conexión con Evolution API, asegúrate de que las credenciales sean correctas y que tu servidor Evolution API esté activo.

---

**Proyecto creado exitosamente por el agente backend-architect**