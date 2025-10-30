# ChatGPT Actions Integration Guide

This guide will walk you through integrating the Evolution API Proxy with ChatGPT Actions.

## Prerequisites

- ChatGPT Plus subscription
- Access to create Custom GPTs
- Evolution API Proxy deployed and accessible via public URL

## Step-by-Step Integration

### 1. Deploy Your Backend

First, ensure your backend is deployed and accessible publicly. You have several options:

#### Option A: Use ngrok (for testing)

```bash
# Start your server
npm run dev

# In another terminal, start ngrok
ngrok http 3000
```

Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)

#### Option B: Deploy to Railway

```bash
railway login
railway init
railway up
```

Get your Railway URL from the dashboard.

#### Option C: Deploy to Render

1. Connect your GitHub repository to Render
2. Create new Web Service
3. Deploy automatically
4. Get your Render URL

### 2. Update OpenAPI Specification

1. Open `openapi.json`
2. Update the servers section with your deployed URL:

```json
{
  "servers": [
    {
      "url": "https://your-deployed-url.com/api",
      "description": "Production server"
    }
  ]
}
```

### 3. Create Your Custom GPT

1. Go to [ChatGPT](https://chat.openai.com)
2. Click your profile picture
3. Select "My GPTs"
4. Click "Create a GPT"
5. Click "Configure" tab

### 4. Configure GPT Basic Settings

Set the following:

**Name**: WhatsApp Assistant

**Description**:
```
An AI assistant that can manage WhatsApp instances, send messages, create groups, and handle WhatsApp automation through Evolution API.
```

**Instructions**:
```
You are a WhatsApp automation assistant powered by Evolution API. You can:

1. Manage WhatsApp instances (create, list, connect, disconnect)
2. Send text and media messages
3. Check if numbers are on WhatsApp
4. Create and manage WhatsApp groups
5. List contacts and chats
6. Configure webhooks for receiving events

When users ask you to perform WhatsApp operations:
- Always confirm the instance name before operations
- For phone numbers, remind users to use international format without "+"
- When sending messages, be concise and clear
- If an instance is not connected, guide them to connect it first

Best practices:
- Phone numbers should be in format: 5511999999999 (country code + number)
- Instance names should be lowercase with hyphens (e.g., "my-whatsapp-bot")
- Always check connection status before sending messages
- Provide clear, actionable feedback
```

**Conversation starters**:
```
- "List all my WhatsApp instances"
- "Create a new WhatsApp instance"
- "Send a message to a contact"
- "Create a WhatsApp group"
```

### 5. Import Actions Schema

1. Scroll down to "Actions" section
2. Click "Create new action"
3. Click "Import from URL" or upload `openapi.json`
4. The schema will be automatically populated

### 6. Configure Authentication

1. In the Actions section, scroll to "Authentication"
2. Select "API Key"
3. Configure:
   - **API Key**: `BC10D87095B7-44E2-B1A4-F03BE2BECE24`
   - **Auth Type**: Custom
   - **Custom Header Name**: `apikey`

### 7. Configure Privacy and Availability

1. Set availability (Only Me / Anyone with Link / Public)
2. Review and accept terms
3. Click "Save" or "Update"

### 8. Test Your Integration

Try these commands with your GPT:

#### Test 1: Check API Health
```
Is the WhatsApp API working?
```

#### Test 2: List Instances
```
Show me all my WhatsApp instances
```

#### Test 3: Create Instance
```
Create a new WhatsApp instance called "test-bot"
```

#### Test 4: Send Message
```
Send a message to +55 11 99999-9999 saying "Hello from ChatGPT!"
```

#### Test 5: Create Group
```
Create a WhatsApp group called "Team Chat" with members +5511999999999 and +5511888888888
```

## Advanced Configuration

### Custom Instructions for Specific Use Cases

#### Customer Support Bot
```
You are a customer support WhatsApp bot. When users interact with you:
1. Always be polite and professional
2. Confirm customer details before taking actions
3. Log all interactions
4. Escalate complex issues to human agents
5. Send follow-up messages for important actions
```

#### Marketing Campaign Bot
```
You help manage WhatsApp marketing campaigns. Your capabilities:
1. Send bulk messages to contact lists
2. Schedule message delivery
3. Track message delivery status
4. Create broadcast lists
5. Generate campaign reports
```

#### Team Communication Bot
```
You manage internal team communication via WhatsApp:
1. Create and manage team groups
2. Send announcements to multiple groups
3. Share documents and media
4. Set up webhook notifications
5. Manage team member access
```

### Environment-Specific Configurations

#### Development
```json
{
  "servers": [
    {
      "url": "http://localhost:3000/api",
      "description": "Local development"
    }
  ]
}
```

#### Staging
```json
{
  "servers": [
    {
      "url": "https://staging.yourdomain.com/api",
      "description": "Staging environment"
    }
  ]
}
```

#### Production
```json
{
  "servers": [
    {
      "url": "https://api.yourdomain.com/api",
      "description": "Production environment"
    }
  ]
}
```

## Troubleshooting

### Issue: Actions Not Working

**Solution**:
1. Check if backend is accessible: `curl https://your-url.com/api/health`
2. Verify API key is correct in ChatGPT settings
3. Check logs on your server for errors
4. Ensure CORS is properly configured

### Issue: Authentication Errors

**Solution**:
1. Verify the API key matches in `.env` and ChatGPT
2. Check the header name is exactly `apikey` (lowercase)
3. Ensure the API key is being sent with every request

### Issue: Timeout Errors

**Solution**:
1. Increase timeout in `src/config/index.ts`
2. Check Evolution API is responding
3. Verify network connectivity
4. Check rate limiting settings

### Issue: CORS Errors

**Solution**:
Update CORS settings in `.env`:
```env
CORS_ORIGIN=https://chat.openai.com
```

## Best Practices

### 1. Security
- Never share your API key publicly
- Use environment variables for sensitive data
- Implement IP whitelisting if possible
- Enable HTTPS in production
- Rotate API keys regularly

### 2. Rate Limiting
- Configure appropriate rate limits
- Monitor API usage
- Implement backoff strategies
- Cache frequently accessed data

### 3. Error Handling
- Provide clear error messages
- Log all errors for debugging
- Implement retry logic for transient failures
- Handle Evolution API downtime gracefully

### 4. Monitoring
- Set up uptime monitoring
- Track API response times
- Monitor error rates
- Set up alerts for critical issues

### 5. Testing
- Test all endpoints before deployment
- Validate phone number formats
- Test with various message types
- Verify webhook configurations

## Example Use Cases

### 1. Customer Service Automation
```
User: "Send a welcome message to new customer +5511999999999"
GPT: I'll send a welcome message to that number.
[Calls sendTextMessage endpoint]
GPT: "Message sent successfully! The customer received: 'Welcome to our service...'"
```

### 2. Appointment Reminders
```
User: "Send appointment reminder to +5511999999999 for tomorrow at 3 PM"
GPT: I'll send the appointment reminder.
[Calls sendTextMessage with formatted reminder]
GPT: "Reminder sent! The customer will receive it shortly."
```

### 3. Broadcast Messages
```
User: "Send 'Happy Holidays' to all my groups"
GPT: Let me list your groups first.
[Calls listGroups]
GPT: "You have 3 groups. I'll send the message to each one."
[Calls sendTextMessage for each group]
GPT: "Message sent to all 3 groups successfully!"
```

## Next Steps

1. **Test thoroughly** - Try all actions with your GPT
2. **Monitor usage** - Check logs and metrics
3. **Optimize** - Improve based on real usage patterns
4. **Scale** - Deploy to production-ready infrastructure
5. **Iterate** - Add new features based on user needs

## Resources

- [Evolution API Documentation](https://doc.evolution-api.com/)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [ChatGPT Actions Documentation](https://platform.openai.com/docs/actions)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review server logs in `logs/` directory
3. Test endpoints directly with curl or Postman
4. Verify Evolution API is operational
5. Check ChatGPT Actions configuration

---

**Happy automating with ChatGPT and WhatsApp!**
