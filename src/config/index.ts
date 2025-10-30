import dotenv from 'dotenv';

dotenv.config();

interface Config {
  env: string;
  port: number;
  host: string;
  evolutionApi: {
    url: string;
    apiKey: string;
    timeout: number;
  };
  api: {
    prefix: string;
    version: string;
  };
  cors: {
    origin: string | string[];
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  logging: {
    level: string;
    format: string;
  };
}

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || '0.0.0.0',
  evolutionApi: {
    url: process.env.EVOLUTION_API_URL || '',
    apiKey: process.env.EVOLUTION_API_KEY || '',
    timeout: 30000, // 30 seconds
  },
  api: {
    prefix: process.env.API_PREFIX || '/api',
    version: process.env.API_VERSION || 'v1',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined',
  },
};

// Validate required configuration
if (!config.evolutionApi.url) {
  throw new Error('EVOLUTION_API_URL is required');
}

if (!config.evolutionApi.apiKey) {
  throw new Error('EVOLUTION_API_KEY is required');
}

export default config;
