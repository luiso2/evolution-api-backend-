import { Router, Request, Response } from 'express';
import instanceRoutes from './instance.routes';
import messageRoutes from './message.routes';
import contactRoutes from './contact.routes';
import groupRoutes from './group.routes';
import webhookRoutes from './webhook.routes';
import chatRoutes from './chat.routes';
import config from '../config';

const router = Router();

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
  });
});

// API info
router.get('/info', (req: Request, res: Response) => {
  res.json({
    success: true,
    name: 'Evolution API Proxy',
    version: '1.0.0',
    description: 'Proxy backend for Evolution API with ChatGPT Actions integration',
    environment: config.env,
    evolutionApi: {
      url: config.evolutionApi.url,
      connected: true,
    },
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/instances', instanceRoutes);
router.use('/instances/:instanceName/messages', messageRoutes);
router.use('/instances/:instanceName/contacts', contactRoutes);
router.use('/instances/:instanceName/groups', groupRoutes);
router.use('/instances/:instanceName/webhook', webhookRoutes);
router.use('/instances/:instanceName/chats', chatRoutes);

export default router;
