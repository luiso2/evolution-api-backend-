import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// import compression from 'compression';
import rateLimit from 'express-rate-limit';
import config from './config';
import router from './routes';
import ErrorHandler from './middleware/errorHandler';
import logger from './utils/logger';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS configuration
    this.app.use(cors({
      origin: config.cors.origin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],
    }));

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Compression middleware
    // this.app.use(compression());

    // Logging middleware
    const morganFormat = config.env === 'development' ? 'dev' : config.logging.format;
    this.app.use(morgan(morganFormat, {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: config.rateLimit.windowMs,
      max: config.rateLimit.maxRequests,
      message: {
        success: false,
        error: {
          message: 'Too many requests from this IP, please try again later.',
        },
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use(limiter);

    // Request logging
    this.app.use((req, res, next) => {
      logger.debug('Incoming request', {
        method: req.method,
        path: req.path,
        query: req.query,
        ip: req.ip,
      });
      next();
    });
  }

  private setupRoutes(): void {
    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Evolution API Proxy - Running',
        version: '1.0.0',
        documentation: '/api/info',
        health: '/api/health',
        timestamp: new Date().toISOString(),
      });
    });

    // Health check endpoints (multiple for compatibility)
    const healthResponse = () => ({
      success: true,
      status: 'healthy',
      service: 'Evolution API Proxy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.env,
    });

    // Multiple health check routes for different services
    this.app.get('/health', (req, res) => res.json(healthResponse()));
    this.app.get('/status', (req, res) => res.json(healthResponse()));
    this.app.get('/.well-known/health', (req, res) => res.json(healthResponse()));

    // Simple health check for basic monitoring
    this.app.get('/healthz', (req, res) => res.status(200).send('OK'));
    this.app.get('/ping', (req, res) => res.status(200).send('pong'));

    // API routes
    this.app.use(config.api.prefix, router);
  }

  private setupErrorHandling(): void {
    // 404 handler
    this.app.use(ErrorHandler.notFound);

    // Global error handler
    this.app.use(ErrorHandler.handle);
  }

  public getApp(): Application {
    return this.app;
  }
}

export default new App().getApp();
