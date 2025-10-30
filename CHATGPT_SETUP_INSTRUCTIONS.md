# 🤖 INSTRUCCIONES PARA CONFIGURAR CHATGPT CON EVOLUTION API

## 📋 Prerrequisitos

1. ✅ Backend desplegado en Railway (funcionando)
2. ✅ URL del backend: `https://tu-proyecto.up.railway.app`
3. ✅ API Key de Evolution API configurada
4. ✅ Acceso a ChatGPT Plus o Team

## 🚀 PASO 1: Obtener la URL de tu Backend

### Opción A: Desde Railway Dashboard
1. Ve a [Railway Dashboard](https://railway.com)
2. Selecciona tu proyecto
3. Click en "Settings"
4. Copia la URL en "Domains" (ej: `https://evolution-api-backend-production.up.railway.app`)

### Opción B: Desde Railway CLI
```bash
railway status
# Busca: Deployment URL
```

## 📝 PASO 2: Configurar Custom GPT

### 2.1 Crear un nuevo GPT
1. Ve a [chat.openai.com](https://chat.openai.com)
2. Click en "Explore GPTs"
3. Click en "Create a GPT" o "+"

### 2.2 Configuración Básica
En la pestaña "Configure":

**Name:**
```
Evolution WhatsApp Assistant
```

**Description:**
```
Asistente especializado en gestión de WhatsApp Business a través de Evolution API. Puedo enviar mensajes, gestionar instancias, crear grupos y manejar webhooks de WhatsApp.
```

**Instructions:**
```
Eres un asistente especializado en WhatsApp Business que utiliza Evolution API para gestionar comunicaciones empresariales. Tu función principal es ayudar a los usuarios a:

## Capacidades principales:
1. **Gestión de Instancias**: Crear, configurar y administrar instancias de WhatsApp
2. **Mensajería**: Enviar mensajes de texto, imágenes, documentos y audio
3. **Grupos**: Crear y gestionar grupos de WhatsApp
4. **Webhooks**: Configurar notificaciones y respuestas automáticas
5. **QR Code**: Generar códigos QR para conectar dispositivos

## Comportamiento:
- Siempre confirma antes de enviar mensajes masivos
- Valida números de teléfono en formato internacional (+código país)
- Proporciona respuestas claras sobre el estado de las operaciones
- Maneja errores de manera informativa
- Sugiere mejores prácticas para WhatsApp Business

## Formato de números:
- Siempre usa formato internacional: +1234567890
- Elimina espacios y caracteres especiales
- Para Brasil: +55, México: +52, USA: +1, etc.

## Seguridad:
- No compartas tokens o API keys
- Confirma acciones sensibles antes de ejecutar
- Respeta las políticas de WhatsApp Business

## Casos de uso comunes:
1. Envío de notificaciones a clientes
2. Respuestas automáticas a consultas
3. Gestión de listas de difusión
4. Integración con CRM y sistemas empresariales
5. Atención al cliente 24/7

Cuando el usuario te pida realizar una acción, usa las Actions configuradas para interactuar con Evolution API a través del backend proxy.
```

**Conversation starters:**
```
1. "Envía un mensaje de WhatsApp"
2. "Muestra el estado de mi instancia"
3. "Crea un grupo de WhatsApp"
4. "Genera el código QR para conectar"
```

## 🔧 PASO 3: Configurar Actions (GPT Actions)

### 3.1 Click en "Create new action"

### 3.2 Configurar la Action

**Authentication:**
```
None (el backend maneja la autenticación)
```

**Schema (OpenAPI Specification):**
```yaml
openapi: 3.1.0
info:
  title: Evolution API WhatsApp Integration
  description: Backend proxy for Evolution API WhatsApp management
  version: 1.0.0
servers:
  - url: https://TU-BACKEND-URL.railway.app
    description: Production server on Railway
paths:
  /api/instance/create:
    post:
      operationId: createInstance
      summary: Create a new WhatsApp instance
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                instanceName:
                  type: string
                  description: Unique name for the instance
                number:
                  type: string
                  description: WhatsApp number
              required:
                - instanceName
      responses:
        '200':
          description: Instance created successfully

  /api/instance/{instanceName}/status:
    get:
      operationId: getInstanceStatus
      summary: Get instance connection status
      parameters:
        - name: instanceName
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Instance status retrieved

  /api/message/send-text:
    post:
      operationId: sendTextMessage
      summary: Send a text message via WhatsApp
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                instanceName:
                  type: string
                  description: Name of the instance to use
                number:
                  type: string
                  description: Recipient number in international format
                text:
                  type: string
                  description: Message content
              required:
                - instanceName
                - number
                - text
      responses:
        '200':
          description: Message sent successfully

  /api/message/send-media:
    post:
      operationId: sendMediaMessage
      summary: Send media (image, document, audio) via WhatsApp
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                instanceName:
                  type: string
                number:
                  type: string
                mediaUrl:
                  type: string
                  description: URL of the media file
                mediaType:
                  type: string
                  enum: [image, document, audio, video]
                caption:
                  type: string
                  description: Optional caption for media
              required:
                - instanceName
                - number
                - mediaUrl
                - mediaType
      responses:
        '200':
          description: Media sent successfully

  /api/group/create:
    post:
      operationId: createGroup
      summary: Create a WhatsApp group
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                instanceName:
                  type: string
                groupName:
                  type: string
                participants:
                  type: array
                  items:
                    type: string
                  description: Array of phone numbers
              required:
                - instanceName
                - groupName
                - participants
      responses:
        '200':
          description: Group created successfully

  /api/instance/{instanceName}/qrcode:
    get:
      operationId: getQRCode
      summary: Get QR code for instance connection
      parameters:
        - name: instanceName
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: QR code retrieved

  /api/webhook/config:
    post:
      operationId: configureWebhook
      summary: Configure webhook for message reception
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                instanceName:
                  type: string
                webhookUrl:
                  type: string
                  description: URL to receive webhook notifications
                events:
                  type: array
                  items:
                    type: string
                  description: Events to listen for
              required:
                - instanceName
                - webhookUrl
      responses:
        '200':
          description: Webhook configured

  /api/contacts/list:
    get:
      operationId: listContacts
      summary: List all contacts
      parameters:
        - name: instanceName
          in: query
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Contacts retrieved

  /api/chat/list:
    get:
      operationId: listChats
      summary: List all chats
      parameters:
        - name: instanceName
          in: query
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Chats retrieved

  /api/instance/{instanceName}/logout:
    post:
      operationId: logoutInstance
      summary: Logout from WhatsApp instance
      parameters:
        - name: instanceName
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Logged out successfully
```

**⚠️ IMPORTANTE:** Reemplaza `TU-BACKEND-URL` con tu URL real de Railway

### 3.3 Test the Action
1. Click en "Test" junto a cada endpoint
2. Prueba primero `getInstanceStatus` con una instancia de prueba
3. Si funciona, prueba `sendTextMessage`

## 📱 PASO 4: Configurar Privacy & Capabilities

En la pestaña "Configure":

**Capabilities:**
- ✅ Web Browsing (OFF)
- ✅ DALL·E Image Generation (OFF)
- ✅ Code Interpreter (OFF)

Solo dejar activo:
- ✅ Actions

## 🧪 PASO 5: Probar el GPT

### Test básicos:
1. **Verificar conexión:**
   ```
   "Muestra el estado de la instancia 'default'"
   ```

2. **Enviar mensaje de prueba:**
   ```
   "Envía un mensaje de prueba al número +1234567890 desde la instancia 'default'"
   ```

3. **Obtener QR Code:**
   ```
   "Genera el código QR para conectar la instancia 'default'"
   ```

## 🎯 PASO 6: Publicar el GPT

### Opciones de publicación:
1. **Only me** - Solo para ti (recomendado para empezar)
2. **Anyone with a link** - Compartir con link
3. **Public** - Público en el GPT Store

Click en "Save" o "Update" para guardar los cambios.

## 📊 Ejemplos de Uso

### Enviar mensaje simple:
```
Usuario: "Envía 'Hola, bienvenido a nuestro servicio' al +5511999887766 usando la instancia principal"
GPT: [Ejecuta la action sendTextMessage]
```

### Enviar imagen:
```
Usuario: "Envía la imagen https://ejemplo.com/promo.jpg al +5511999887766 con el texto 'Nueva promoción'"
GPT: [Ejecuta la action sendMediaMessage]
```

### Crear grupo:
```
Usuario: "Crea un grupo llamado 'Soporte VIP' con los números +5511999887766 y +5511888776655"
GPT: [Ejecuta la action createGroup]
```

## 🛠️ Troubleshooting

### Error: "Connection refused"
- Verifica que tu backend en Railway esté activo
- Confirma la URL correcta del backend

### Error: "Instance not found"
- Verifica el nombre de la instancia
- Crea la instancia primero si no existe

### Error: "Invalid number format"
- Usa formato internacional: +[código país][número]
- Elimina espacios y caracteres especiales

### Error: "Action failed"
- Revisa los logs en Railway
- Verifica las variables de entorno
- Confirma que Evolution API esté funcionando

## 🔒 Seguridad

1. **No compartas tu GPT** si contiene información sensible
2. **Usa nombres de instancia únicos** para evitar conflictos
3. **Monitorea el uso** en Railway Dashboard
4. **Implementa rate limiting** si es necesario

## 📚 Recursos Adicionales

- [Evolution API Docs](https://doc.evolution-api.com)
- [Railway Dashboard](https://railway.com)
- [OpenAI GPT Builder Guide](https://help.openai.com/en/articles/8554397-gpts)

## ✅ Checklist Final

- [ ] Backend desplegado y funcionando en Railway
- [ ] URL del backend copiada correctamente
- [ ] GPT creado con nombre e instrucciones
- [ ] Actions configuradas con OpenAPI schema
- [ ] URL del backend agregada en el schema
- [ ] Actions probadas exitosamente
- [ ] GPT guardado/publicado

---

**Última actualización**: Oct 30, 2025
**Backend**: Evolution API Proxy v1.0.0
**Compatible con**: ChatGPT Plus/Team/Enterprise