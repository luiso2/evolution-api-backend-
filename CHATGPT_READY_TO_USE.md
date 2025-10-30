# ✅ CHATGPT LISTO PARA USAR - SCHEMA CORREGIDO

## 🚀 CONFIGURACIÓN RÁPIDA (3 PASOS)

### PASO 1: Crear Custom GPT
1. Ve a [chat.openai.com](https://chat.openai.com)
2. Click en "Explore" → "Create a GPT"
3. Dale el nombre: **Evolution WhatsApp Assistant**

### PASO 2: Pegar Instructions
En el campo "Instructions", pega el contenido del archivo `GPT_INSTRUCTIONS.txt`

### PASO 3: Configurar Actions
1. Click en "Create new action"
2. En el campo "Schema", pega TODO este código:

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Evolution API Proxy",
    "version": "1.0.0",
    "description": "Proxy backend for Evolution API enabling ChatGPT Actions integration for WhatsApp automation"
  },
  "servers": [
    {
      "url": "https://backend-production-6fab.up.railway.app",
      "description": "Production server"
    }
  ],
  "paths": {
    "/health": {
      "get": {
        "summary": "Health check endpoint",
        "operationId": "healthCheck",
        "responses": {
          "200": {
            "description": "API is healthy"
          }
        }
      }
    },
    "/api/instance/{instanceName}/status": {
      "get": {
        "summary": "Get instance connection status",
        "operationId": "getInstanceStatus",
        "parameters": [
          {
            "name": "instanceName",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "default": "default"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Instance status retrieved"
          }
        }
      }
    },
    "/api/message/send-text": {
      "post": {
        "summary": "Send text message via WhatsApp",
        "operationId": "sendTextMessage",
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
                    "type": "string",
                    "description": "Phone number with country code"
                  },
                  "text": {
                    "type": "string",
                    "description": "Message to send"
                  }
                },
                "required": ["instanceName", "number", "text"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Message sent"
          }
        }
      }
    },
    "/api/message/send-media": {
      "post": {
        "summary": "Send media message via WhatsApp",
        "operationId": "sendMediaMessage",
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
                  "mediaUrl": {
                    "type": "string",
                    "format": "uri"
                  },
                  "mediaType": {
                    "type": "string",
                    "enum": ["image", "document", "audio", "video"]
                  },
                  "caption": {
                    "type": "string"
                  }
                },
                "required": ["instanceName", "number", "mediaUrl", "mediaType"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Media sent"
          }
        }
      }
    },
    "/api/group/create": {
      "post": {
        "summary": "Create WhatsApp group",
        "operationId": "createGroup",
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
                  "groupName": {
                    "type": "string"
                  },
                  "participants": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                },
                "required": ["instanceName", "groupName", "participants"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Group created"
          }
        }
      }
    },
    "/api/instance/{instanceName}/qrcode": {
      "get": {
        "summary": "Get QR code for connection",
        "operationId": "getQRCode",
        "parameters": [
          {
            "name": "instanceName",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "default": "default"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "QR code retrieved"
          }
        }
      }
    },
    "/api/webhook/config": {
      "post": {
        "summary": "Configure webhook",
        "operationId": "configureWebhook",
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
                  "webhookUrl": {
                    "type": "string",
                    "format": "uri"
                  },
                  "events": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                },
                "required": ["instanceName", "webhookUrl"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Webhook configured"
          }
        }
      }
    },
    "/api/contacts/list": {
      "get": {
        "summary": "List all contacts",
        "operationId": "listContacts",
        "parameters": [
          {
            "name": "instanceName",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "default": "default"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Contacts retrieved"
          }
        }
      }
    },
    "/api/chat/list": {
      "get": {
        "summary": "List all chats",
        "operationId": "listChats",
        "parameters": [
          {
            "name": "instanceName",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "default": "default"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Chats retrieved"
          }
        }
      }
    },
    "/api/instance/{instanceName}/logout": {
      "post": {
        "summary": "Logout from WhatsApp",
        "operationId": "logoutInstance",
        "parameters": [
          {
            "name": "instanceName",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "default": "default"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Logged out"
          }
        }
      }
    }
  }
}
```

### ✅ LISTO! Ahora prueba tu GPT:

## 🧪 TESTS BÁSICOS

### Test 1: Verificar conexión
```
"Verifica el health check del servidor"
```
Debería responder con el estado del servidor.

### Test 2: Ver estado de instancia
```
"Muestra el estado de la instancia default"
```

### Test 3: Enviar mensaje
```
"Envía 'Hola, este es un test' al número +5511999887766"
```

## 📱 FORMATO DE NÚMEROS

**IMPORTANTE**: Los números deben estar en formato internacional con `+`:
- Brasil: `+5511999887766`
- México: `+521551234567`
- USA: `+15551234567`
- Argentina: `+5491112345678`

## ⚠️ ERRORES COMUNES Y SOLUCIONES

| Error | Solución |
|-------|----------|
| "Could not parse OpenAPI spec" | Ya está corregido en este schema |
| "404 Not Found /health" | Ya está corregido, el endpoint existe |
| "Instance not found" | Usa "default" como nombre de instancia |
| "Invalid number format" | Usa formato con + (ej: +5511999887766) |

## 🎯 COMANDOS DE EJEMPLO

### Mensaje simple:
```
"Envía 'Buenos días' al +5511999887766"
```

### Mensaje con imagen:
```
"Envía la imagen https://ejemplo.com/foto.jpg con el texto 'Mira esto' al +5511999887766"
```

### Crear grupo:
```
"Crea un grupo llamado 'Mi Grupo' con los números +5511999887766 y +5511888776655"
```

### Ver código QR:
```
"Muestra el código QR para conectar WhatsApp"
```

### Listar contactos:
```
"Muestra todos mis contactos de WhatsApp"
```

## ✅ VERIFICACIÓN FINAL

- [ ] Backend en Railway: `https://backend-production-6fab.up.railway.app`
- [ ] Health check funciona: `/health` devuelve 200 OK
- [ ] GPT creado con nombre "Evolution WhatsApp Assistant"
- [ ] Instructions pegadas del archivo `GPT_INSTRUCTIONS.txt`
- [ ] Schema pegado (el de arriba, ya corregido)
- [ ] Test básico funcionando

## 🚀 URL DEL BACKEND

Tu backend está en:
```
https://backend-production-6fab.up.railway.app
```

Puedes verificar que funciona visitando:
```
https://backend-production-6fab.up.railway.app/health
```

---

**¡Tu ChatGPT ya está listo para enviar WhatsApp!** 🎉

Si necesitas ayuda:
1. Revisa los logs en Railway Dashboard
2. Verifica que Evolution API esté funcionando
3. Confirma que las variables de entorno estén configuradas