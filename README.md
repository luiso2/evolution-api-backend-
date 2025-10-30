# Evolution API Proxy Backend

A production-ready Node.js/Express.js proxy backend for Evolution API that enables seamless integration with ChatGPT Actions. This proxy provides a clean, standardized REST API for WhatsApp automation through Evolution API.

## Features

- **Complete REST API**: Full coverage of Evolution API endpoints
- **ChatGPT Actions Ready**: OpenAPI 3.1.0 specification for easy ChatGPT integration
- **Type-Safe**: Built with TypeScript for enhanced reliability
- **Production-Ready**: Comprehensive error handling, logging, and security
- **Request Validation**: Schema validation using Joi
- **Rate Limiting**: Built-in rate limiting to prevent abuse
- **CORS Support**: Configurable CORS for cross-origin requests
- **Logging**: Winston-based logging with file rotation
- **Security**: Helmet.js for HTTP security headers

## Architecture

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   ChatGPT   │─────>│  Proxy Backend   │─────>│ Evolution API   │
│   Actions   │      │  (This Service)  │      │  (WhatsApp)     │
└─────────────┘      └──────────────────┘      └─────────────────┘
                             │
                             ├─ Authentication
                             ├─ Validation
                             ├─ Error Handling
                             ├─ Logging
                             └─ Rate Limiting
```

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Validation**: Joi
- **Logging**: Winston
- **Security**: Helmet, express-rate-limit
- **CORS**: cors

## Project Structure

```
evolution-api-proxy/
├── src/
│   ├── config/              # Configuration management
│   │   └── index.ts
│   ├── controllers/         # Request handlers
│   │   ├── instance.controller.ts
│   │   ├── message.controller.ts
│   │   ├── contact.controller.ts
│   │   ├── group.controller.ts
│   │   ├── webhook.controller.ts
│   │   └── chat.controller.ts
│   ├── middleware/          # Express middleware
│   │   ├── errorHandler.ts
│   │   └── validators.ts
│   ├── routes/              # API routes
│   │   ├── index.ts
│   │   ├── instance.routes.ts
│   │   ├── message.routes.ts
│   │   ├── contact.routes.ts
│   │   ├── group.routes.ts
│   │   ├── webhook.routes.ts
│   │   └── chat.routes.ts
│   ├── services/            # Business logic
│   │   └── evolutionApi.service.ts
│   ├── utils/               # Utilities
│   │   └── logger.ts
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── logs/                    # Application logs
├── openapi.json            # OpenAPI 3.1.0 specification
├── .env                    # Environment variables
├── .env.example            # Environment variables template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Evolution API instance (provided)

### Setup Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd "/Users/josemichaelhernandezvargas/Desktop/evolution api backend"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables** (already set in `.env`):
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=3000
   HOST=0.0.0.0

   # Evolution API Configuration
   EVOLUTION_API_URL=https://evolution-api-evolution-api.dqyvuv.easypanel.host
   EVOLUTION_API_KEY=BC10D87095B7-44E2-B1A4-F03BE2BECE24

   # API Configuration
   API_PREFIX=/api
   API_VERSION=v1

   # CORS Configuration
   CORS_ORIGIN=*

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100

   # Logging
   LOG_LEVEL=info
   LOG_FORMAT=combined
   ```

4. **Build TypeScript**:
   ```bash
   npm run build
   ```

5. **Start the server**:
   ```bash
   # Development (with hot reload)
   npm run dev

   # Production
   npm start
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Health & Info

- `GET /api/health` - Health check endpoint
- `GET /api/info` - API information and version

### Instance Management

- `GET /api/instances` - List all WhatsApp instances
- `POST /api/instances` - Create a new instance
- `GET /api/instances/:instanceName` - Get instance details
- `DELETE /api/instances/:instanceName` - Delete an instance
- `GET /api/instances/:instanceName/status` - Get connection status
- `POST /api/instances/:instanceName/connect` - Connect instance (get QR code)
- `POST /api/instances/:instanceName/disconnect` - Disconnect instance

### Message Operations

- `POST /api/instances/:instanceName/messages/send` - Send text message
- `POST /api/instances/:instanceName/messages/sendMedia` - Send media message
- `GET /api/instances/:instanceName/messages/list?chatId=...` - List messages from a chat
- `POST /api/instances/:instanceName/messages/sendList` - Send list message
- `POST /api/instances/:instanceName/messages/sendButtons` - Send button message

### Contact Management

- `GET /api/instances/:instanceName/contacts` - List all contacts
- `GET /api/instances/:instanceName/contacts/:contactId` - Get contact details
- `POST /api/instances/:instanceName/contacts/check` - Check if number is on WhatsApp

### Group Management

- `GET /api/instances/:instanceName/groups` - List all groups
- `GET /api/instances/:instanceName/groups/:groupId` - Get group details
- `POST /api/instances/:instanceName/groups` - Create new group
- `POST /api/instances/:instanceName/groups/:groupId/participants` - Add/remove participants

### Webhook Management

- `GET /api/instances/:instanceName/webhook` - Get webhook configuration
- `POST /api/instances/:instanceName/webhook` - Set webhook URL
- `DELETE /api/instances/:instanceName/webhook` - Remove webhook

### Chat Operations

- `GET /api/instances/:instanceName/chats` - List all chats
- `GET /api/instances/:instanceName/chats/:chatId` - Get chat details
- `DELETE /api/instances/:instanceName/chats/:chatId` - Delete chat

## ChatGPT Actions Integration

### Step 1: Deploy Your Backend

Deploy this backend to a publicly accessible server (Railway, Render, Heroku, etc.) or use ngrok for local testing:

```bash
# Using ngrok for local testing
ngrok http 3000
```

### Step 2: Import OpenAPI Specification to ChatGPT

1. Go to ChatGPT and create a new GPT
2. Navigate to "Actions" section
3. Click "Import from URL" or "Import from file"
4. Use the `openapi.json` file from this project
5. Update the server URL in the OpenAPI spec to your deployed URL

### Step 3: Configure Authentication

In ChatGPT Actions:
1. Select "API Key" authentication
2. Set header name: `apikey`
3. Set the value: `BC10D87095B7-44E2-B1A4-F03BE2BECE24`

### Step 4: Test Your Integration

Try these prompts in your GPT:
- "List all my WhatsApp instances"
- "Create a new instance called 'my-bot'"
- "Send a message to +5511999999999 saying 'Hello from ChatGPT!'"
- "Show me all my WhatsApp groups"

## Example Usage

### Create Instance

```bash
curl -X POST http://localhost:3000/api/instances \
  -H "Content-Type: application/json" \
  -H "apikey: BC10D87095B7-44E2-B1A4-F03BE2BECE24" \
  -d '{
    "instanceName": "my-whatsapp-bot",
    "qrcode": true
  }'
```

### Send Text Message

```bash
curl -X POST http://localhost:3000/api/instances/my-whatsapp-bot/messages/send \
  -H "Content-Type: application/json" \
  -H "apikey: BC10D87095B7-44E2-B1A4-F03BE2BECE24" \
  -d '{
    "number": "5511999999999",
    "text": "Hello from Evolution API!"
  }'
```

### Send Media Message

```bash
curl -X POST http://localhost:3000/api/instances/my-whatsapp-bot/messages/sendMedia \
  -H "Content-Type: application/json" \
  -H "apikey: BC10D87095B7-44E2-B1A4-F03BE2BECE24" \
  -d '{
    "number": "5511999999999",
    "mediatype": "image",
    "media": "https://example.com/image.jpg",
    "caption": "Check out this image!"
  }'
```

### Create WhatsApp Group

```bash
curl -X POST http://localhost:3000/api/instances/my-whatsapp-bot/groups \
  -H "Content-Type: application/json" \
  -H "apikey: BC10D87095B7-44E2-B1A4-F03BE2BECE24" \
  -d '{
    "subject": "My Amazing Group",
    "participants": ["5511999999999", "5511888888888"]
  }'
```

### Set Webhook

```bash
curl -X POST http://localhost:3000/api/instances/my-whatsapp-bot/webhook \
  -H "Content-Type: application/json" \
  -H "apikey: BC10D87095B7-44E2-B1A4-F03BE2BECE24" \
  -d '{
    "url": "https://your-webhook-url.com/webhook",
    "webhook_by_events": true,
    "events": ["messages.upsert", "messages.update"]
  }'
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data from Evolution API
  },
  "timestamp": "2025-10-30T12:00:00.000Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "status": 400,
    "details": "Additional error details"
  },
  "timestamp": "2025-10-30T12:00:00.000Z"
}
```

## Logging

Logs are stored in the `logs/` directory:
- `combined.log` - All logs
- `error.log` - Error logs only
- `exceptions.log` - Uncaught exceptions
- `rejections.log` - Unhandled promise rejections

## Security Best Practices

1. **Never commit `.env` file** - Contains sensitive credentials
2. **Use HTTPS in production** - Always use SSL/TLS
3. **Set CORS properly** - Restrict origins in production
4. **Rate limiting** - Already configured, adjust as needed
5. **Keep dependencies updated** - Run `npm audit` regularly
6. **Use environment-specific configs** - Different settings for dev/prod

## Deployment

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create new project
railway init

# Add environment variables
railway variables set EVOLUTION_API_URL=...
railway variables set EVOLUTION_API_KEY=...

# Deploy
railway up
```

### Render

1. Create new Web Service
2. Connect your repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables from `.env.example`

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Development

### Run Tests

```bash
npm test
```

### Lint Code

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

### Watch Mode (Development)

```bash
npm run dev
```

## Troubleshooting

### Port Already in Use

Change the port in `.env`:
```env
PORT=3001
```

### Connection to Evolution API Failed

1. Verify `EVOLUTION_API_URL` is correct
2. Check `EVOLUTION_API_KEY` is valid
3. Ensure Evolution API is running and accessible

### CORS Issues

Update CORS settings in `.env`:
```env
CORS_ORIGIN=https://your-frontend-domain.com
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## License

MIT

## Support

For issues and questions:
- Check the logs in `logs/` directory
- Review Evolution API documentation
- Open an issue in the repository

## Roadmap

- [ ] Add authentication layer (JWT)
- [ ] Implement caching with Redis
- [ ] Add unit and integration tests
- [ ] WebSocket support for real-time events
- [ ] Admin dashboard UI
- [ ] Metrics and monitoring endpoints
- [ ] Docker Compose setup
- [ ] CI/CD pipeline configuration

---

**Built with ❤️ for WhatsApp automation via Evolution API**
