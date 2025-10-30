# START HERE - Evolution API Proxy

Welcome! This is your complete Evolution API Proxy backend for ChatGPT Actions.

## What is this?

A production-ready Node.js/Express.js backend that:
- Acts as a proxy for Evolution API (WhatsApp automation)
- Enables ChatGPT to send WhatsApp messages
- Provides 27 REST endpoints for complete WhatsApp control
- Includes comprehensive documentation and deployment guides

## Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════════════════════╗
║   Evolution API Proxy Server                          ║
║   Environment: development                            ║
║   Server:      http://0.0.0.0:3000                    ║
╚════════════════════════════════════════════════════════╝
```

### Step 3: Test It
Open a new terminal and run:
```bash
curl http://localhost:3000/api/health
```

You should see:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-10-30T..."
}
```

## What's Next?

### For Development
📖 Read **QUICK_START.md** for detailed testing and usage

### For ChatGPT Integration
🤖 Read **CHATGPT_INTEGRATION_GUIDE.md** for step-by-step setup

### For Understanding Architecture
🏗️ Read **ARCHITECTURE.md** for technical details

### For Complete Reference
📚 Read **README.md** for full documentation

## Project Structure

```
evolution api backend/
├── START_HERE.md              ← You are here
├── QUICK_START.md            ← Next step
├── README.md                 ← Full documentation
├── CHATGPT_INTEGRATION_GUIDE.md  ← ChatGPT setup
├── ARCHITECTURE.md           ← Technical details
├── PROJECT_SUMMARY.md        ← Overview
├── src/                      ← Source code
├── openapi.json              ← API specification
└── .env                      ← Configuration (ready to use)
```

## Already Configured

✅ Evolution API credentials loaded
✅ Environment variables set
✅ TypeScript configured
✅ All dependencies listed
✅ Docker support ready
✅ OpenAPI spec ready for ChatGPT

## Available Commands

```bash
npm run dev      # Start development server (hot reload)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Check code quality
npm run format   # Format code
```

## Need Help?

1. **Can't start server?**
   - Check if port 3000 is free
   - Run: `lsof -i :3000` to find what's using it
   - Change PORT in .env if needed

2. **Connection errors?**
   - Verify Evolution API is running
   - Check credentials in .env
   - Review logs in logs/ folder

3. **Want to deploy?**
   - See README.md section "Deployment"
   - Railway, Render, or Docker supported

## Test Endpoints

```bash
# Health check (no auth needed)
curl http://localhost:3000/api/health

# API info (no auth needed)
curl http://localhost:3000/api/info

# List instances (needs API key)
curl http://localhost:3000/api/instances \
  -H "apikey: BC10D87095B7-44E2-B1A4-F03BE2BECE24"
```

## Documentation Files

| File | Purpose | When to Read |
|------|---------|--------------|
| START_HERE.md | This file | Right now |
| QUICK_START.md | Quick setup | Next (5 min) |
| README.md | Complete docs | Reference |
| CHATGPT_INTEGRATION_GUIDE.md | ChatGPT setup | When deploying |
| ARCHITECTURE.md | Technical details | For understanding |
| PROJECT_SUMMARY.md | Overview | Quick reference |

## Your Evolution API Credentials

Already configured in `.env`:
- **URL**: https://evolution-api-evolution-api.dqyvuv.easypanel.host
- **API Key**: BC10D87095B7-44E2-B1A4-F03BE2BECE24

## What Can You Do?

With this backend, you can:
- ✅ Create WhatsApp instances
- ✅ Send text messages
- ✅ Send media (images, videos, audio)
- ✅ Send interactive lists and buttons
- ✅ Manage contacts
- ✅ Create and manage groups
- ✅ Configure webhooks
- ✅ List chats and messages
- ✅ All via ChatGPT Actions!

## Your Next Steps

1. ✅ You're reading this (good!)
2. ⬜ Run `npm install`
3. ⬜ Run `npm run dev`
4. ⬜ Test health endpoint
5. ⬜ Read QUICK_START.md
6. ⬜ Deploy to production
7. ⬜ Configure ChatGPT Actions
8. ⬜ Start automating WhatsApp!

---

**Ready to start?** Run: `npm install && npm run dev`

**Questions?** Check README.md or logs/ folder

**Happy coding!** 🚀
