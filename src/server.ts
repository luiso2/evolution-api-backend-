import app from './app';
import config from './config';
import logger from './utils/logger';
import fs from 'fs';
import path from 'path';

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Start server
const server = app.listen(config.port, config.host, () => {
  logger.info(`Server started successfully`, {
    environment: config.env,
    host: config.host,
    port: config.port,
    apiPrefix: config.api.prefix,
    evolutionApiUrl: config.evolutionApi.url,
  });

  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   Evolution API Proxy Server                          ║
║                                                        ║
║   Environment: ${config.env.padEnd(38)} ║
║   Server:      http://${config.host}:${config.port.toString().padEnd(28)} ║
║   API Prefix:  ${config.api.prefix.padEnd(38)} ║
║                                                        ║
║   Health Check: /api/health                           ║
║   API Info:     /api/info                             ║
║   OpenAPI Spec: /openapi.json                         ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} received, shutting down gracefully`);
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any) => {
  logger.error('Unhandled Rejection', { reason });
  gracefulShutdown('unhandledRejection');
});

export default server;
