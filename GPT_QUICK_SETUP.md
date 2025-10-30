# 🚀 GUÍA RÁPIDA: CONFIGURAR CHATGPT CON TU BACKEND

## 1️⃣ OBTÉN TU URL DE RAILWAY
```bash
# Tu URL será algo como:
https://evolution-api-backend-production.up.railway.app
```
Encuéntrala en Railway Dashboard → Settings → Domains

## 2️⃣ CREA UN CUSTOM GPT

1. Ve a [chat.openai.com](https://chat.openai.com)
2. Click en "Explore" → "Create a GPT"

## 3️⃣ PEGA ESTAS INSTRUCCIONES EN "Instructions"

```markdown
Eres un asistente de WhatsApp Business que usa Evolution API.

CAPACIDADES:
- Enviar mensajes de texto, imágenes, documentos
- Crear y gestionar grupos
- Verificar estado de conexión
- Generar códigos QR

FORMATO DE NÚMEROS: Siempre internacional (+5511999887766)

CONFIRMACIÓN: Siempre confirma antes de enviar mensajes masivos

ERRORES: Explica claramente qué salió mal y cómo solucionarlo
```

## 4️⃣ CONFIGURA LAS ACTIONS

### Click en "Create new action" y pega este Schema:

```yaml
openapi: 3.1.0
info:
  title: Evolution API WhatsApp
  version: 1.0.0
servers:
  - url: [TU-URL-DE-RAILWAY-AQUÍ]
    description: Railway Backend
paths:
  /api/instance/{instanceName}/status:
    get:
      operationId: getStatus
      summary: Ver estado de conexión
      parameters:
        - name: instanceName
          in: path
          required: true
          schema:
            type: string
            default: "default"
      responses:
        '200':
          description: Estado obtenido

  /api/message/send-text:
    post:
      operationId: sendMessage
      summary: Enviar mensaje de WhatsApp
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                instanceName:
                  type: string
                  default: "default"
                number:
                  type: string
                  description: "Número con + y código país"
                text:
                  type: string
                  description: "Mensaje a enviar"
              required:
                - instanceName
                - number
                - text
      responses:
        '200':
          description: Mensaje enviado

  /api/message/send-media:
    post:
      operationId: sendMedia
      summary: Enviar imagen/documento
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                instanceName:
                  type: string
                  default: "default"
                number:
                  type: string
                mediaUrl:
                  type: string
                  description: "URL del archivo"
                mediaType:
                  type: string
                  enum: [image, document, audio, video]
                  default: "image"
                caption:
                  type: string
              required:
                - instanceName
                - number
                - mediaUrl
                - mediaType
      responses:
        '200':
          description: Media enviado

  /api/group/create:
    post:
      operationId: createGroup
      summary: Crear grupo de WhatsApp
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                instanceName:
                  type: string
                  default: "default"
                groupName:
                  type: string
                participants:
                  type: array
                  items:
                    type: string
                  description: "Lista de números"
              required:
                - instanceName
                - groupName
                - participants
      responses:
        '200':
          description: Grupo creado

  /api/instance/{instanceName}/qrcode:
    get:
      operationId: getQRCode
      summary: Obtener código QR
      parameters:
        - name: instanceName
          in: path
          required: true
          schema:
            type: string
            default: "default"
      responses:
        '200':
          description: QR obtenido

  /api/contacts/list:
    get:
      operationId: listContacts
      summary: Listar contactos
      parameters:
        - name: instanceName
          in: query
          required: true
          schema:
            type: string
            default: "default"
      responses:
        '200':
          description: Contactos listados
```

**⚠️ IMPORTANTE: Reemplaza `[TU-URL-DE-RAILWAY-AQUÍ]` con tu URL real**

## 5️⃣ CONVERSATION STARTERS

Agrega estos prompts de inicio:
1. "Envía un mensaje de WhatsApp"
2. "Ver estado de mi instancia"
3. "Crear un grupo nuevo"
4. "Mostrar código QR"

## 6️⃣ PRUEBA TU GPT

### Test 1: Verificar conexión
```
"Muestra el estado de la instancia default"
```

### Test 2: Enviar mensaje
```
"Envía 'Hola, este es un test' al +1234567890"
```

### Test 3: Ver QR
```
"Muestra el código QR de la instancia default"
```

## ✅ CHECKLIST RÁPIDO

- [ ] URL de Railway copiada
- [ ] GPT creado con nombre "Evolution WhatsApp Assistant"
- [ ] Instructions pegadas
- [ ] Schema de Actions pegado con TU URL
- [ ] Actions probadas (al menos getStatus)
- [ ] GPT guardado

## 🎯 COMANDOS DE EJEMPLO PARA USUARIOS

### Enviar mensaje simple:
```
"Envía 'Reunión mañana a las 10am' al +5511999887766"
```

### Enviar imagen con texto:
```
"Envía la imagen https://ejemplo.com/foto.jpg con el texto 'Nuevo producto' al +5511999887766"
```

### Crear grupo:
```
"Crea un grupo llamado 'Equipo Ventas' con los números +5511999887766, +5511888776655"
```

### Ver contactos:
```
"Muestra todos mis contactos"
```

## ⚠️ ERRORES COMUNES Y SOLUCIONES

| Error | Solución |
|-------|----------|
| "Connection refused" | Verifica que Railway esté activo |
| "Instance not found" | Usa "default" o crea la instancia primero |
| "Invalid number" | Usa formato: +5511999887766 |
| "Action failed" | Revisa logs en Railway Dashboard |

## 📱 FORMATO DE NÚMEROS POR PAÍS

- 🇧🇷 Brasil: +55 11 99988-7766
- 🇲🇽 México: +52 1 55 1234 5678
- 🇺🇸 USA: +1 555 123 4567
- 🇦🇷 Argentina: +54 9 11 1234-5678
- 🇨🇴 Colombia: +57 1 234 5678

**Siempre sin espacios ni guiones en el GPT: +5511999887766**

## 🔥 TIPS PRO

1. **Nombre de instancia por defecto**: Usa siempre "default" para simplificar
2. **Validación de números**: El GPT debe confirmar el formato antes de enviar
3. **Mensajes masivos**: Implementa confirmación obligatoria
4. **Rate limiting**: No más de 30 mensajes por minuto
5. **Logs**: Revisa Railway Dashboard para debugging

---

**¿Listo?** Tu GPT ya puede enviar WhatsApp! 🚀

**Necesitas ayuda?**
- Revisa los logs en Railway
- Verifica que Evolution API esté funcionando
- Confirma las variables de entorno