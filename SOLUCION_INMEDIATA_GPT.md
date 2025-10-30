# 🚨 SOLUCIÓN INMEDIATA - Dominio Duplicado en ChatGPT

## EL PROBLEMA:
Ya tienes otro GPT usando `backend-production-6fab.up.railway.app`

## 🎯 SOLUCIÓN MÁS RÁPIDA (2 minutos):

### PASO 1: Elimina TODAS las Actions Anteriores
1. Ve a https://chat.openai.com
2. Click en tu perfil (esquina inferior izquierda)
3. Click en **"My GPTs"**
4. Verás todos tus GPTs personalizados
5. **Para CADA GPT que veas:**
   - Click en el ícono de 3 puntos (...)
   - Click en **"Delete"**
   - Confirma la eliminación
6. Repite hasta que no quede ningún GPT

### PASO 2: Crea un GPT Nuevo y Limpio

1. Click en **"Create a GPT"**
2. Dale este nombre: **"WhatsApp Evolution Master"**

### PASO 3: Configura el GPT

#### En "Instructions", pega esto:
```
Soy un asistente de WhatsApp Business que usa Evolution API.

CAPACIDADES:
- Enviar mensajes de texto, imágenes, documentos
- Crear y gestionar grupos
- Verificar estado de conexión
- Generar códigos QR

FORMATO DE NÚMEROS: Siempre internacional (+5511999887766)
INSTANCIA POR DEFECTO: Usar "default" si no se especifica
CONFIRMACIÓN: Siempre confirmar antes de enviar mensajes masivos
```

#### En "Create new action", pega este schema SIMPLIFICADO:

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "WhatsApp API",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://backend-production-6fab.up.railway.app"
    }
  ],
  "paths": {
    "/health": {
      "get": {
        "operationId": "checkHealth",
        "summary": "Check API status",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/message/send-text": {
      "post": {
        "operationId": "sendMessage",
        "summary": "Send WhatsApp message",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "instanceName": {
                    "type": "string",
                    "default": "default"
                  },
                  "number": {
                    "type": "string"
                  },
                  "text": {
                    "type": "string"
                  }
                },
                "required": ["number", "text"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Sent"
          }
        }
      }
    }
  }
}
```

### PASO 4: Guarda y Prueba

1. Click en **"Create"** (esquina superior derecha)
2. Prueba con: **"Verifica el health check"**
3. Si funciona, prueba: **"Envía 'Hola' al +5511999887766"**

---

## 🔥 ALTERNATIVA RÁPIDA: Usa el GPT Store

Si no quieres crear uno nuevo:

1. Ve al GPT Store
2. Busca **"WhatsApp"**
3. Usa cualquier GPT público de WhatsApp que ya exista
4. No necesitarás configurar nada

---

## 💡 SI NADA FUNCIONA:

### Opción Nuclear: Borra TODO y Empieza de Cero

1. **Elimina TODOS tus GPTs personalizados**
2. **Cierra sesión** en ChatGPT
3. **Vuelve a iniciar sesión**
4. **Crea un GPT completamente nuevo**
5. **Usa el schema simplificado de arriba**

---

## ⚠️ IMPORTANTE:

El error **"duplicate domains"** significa que ChatGPT tiene registrado ese dominio en otro lado.
La ÚNICA solución es:
- Encontrar y eliminar el GPT anterior
- O usar un GPT completamente diferente

No hay forma de "forzar" el uso del mismo dominio en dos GPTs.

---

**¿Funcionó? Si sigues con problemas, elimina TODOS tus GPTs y empieza desde cero.**