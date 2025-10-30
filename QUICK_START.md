# Quick Start Guide

Get up and running with the Evolution API Proxy in 5 minutes!

## Installation

```bash
# Navigate to project directory
cd "/Users/josemichaelhernandezvargas/Desktop/evolution api backend"

# Install dependencies
npm install

# Start development server
npm run dev
```

The server will start at `http://localhost:3000`

## Verify Installation

### 1. Check Health
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-10-30T...",
  "uptime": 12.34
}
```

### 2. Check API Info
```bash
curl http://localhost:3000/api/info
```

### 3. List Instances
```bash
curl http://localhost:3000/api/instances \
  -H "apikey: BC10D87095B7-44E2-B1A4-F03BE2BECE24"
```

## Next Steps

1. **Read the main README.md** for detailed documentation
2. **Review CHATGPT_INTEGRATION_GUIDE.md** for ChatGPT setup
3. **Test endpoints** using the examples in README.md
4. **Deploy to production** using Railway, Render, or Docker

## Common Commands

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format
```

## Troubleshooting

### Port 3000 already in use?
Edit `.env` and change `PORT=3000` to `PORT=3001`

### Can't connect to Evolution API?
Verify the credentials in `.env` are correct

### CORS issues?
Update `CORS_ORIGIN` in `.env` with your frontend URL

## Project Structure Overview

```
evolution-api-proxy/
├── src/
│   ├── config/         # Configuration
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── services/       # Evolution API service
│   ├── utils/          # Utilities (logger)
│   ├── app.ts          # Express app
│   └── server.ts       # Entry point
├── logs/               # Application logs
├── openapi.json        # OpenAPI 3.1.0 spec
├── .env                # Environment variables
└── README.md           # Full documentation
```

## What You Can Do

### Instance Management
- Create WhatsApp instances
- Connect/disconnect instances
- Get QR codes for pairing
- Manage instance lifecycle

### Messaging
- Send text messages
- Send media (images, videos, audio, documents)
- Send interactive lists
- Send button messages
- Retrieve message history

### Contacts & Groups
- List contacts
- Check if numbers are on WhatsApp
- Create groups
- Manage group participants
- List group members

### Webhooks
- Configure webhook URLs
- Receive real-time events
- Handle message updates
- Process status changes

## Support

- **Full Documentation**: See README.md
- **ChatGPT Setup**: See CHATGPT_INTEGRATION_GUIDE.md
- **API Reference**: See openapi.json
- **Logs**: Check logs/ directory for errors

---

**Ready to automate WhatsApp with ChatGPT!**
