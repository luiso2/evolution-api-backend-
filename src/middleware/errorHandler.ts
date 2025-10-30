import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

interface ApiError extends Error {
  status?: number;
  isOperational?: boolean;
}

class ErrorHandler {
  static handle(err: ApiError, req: Request, res: Response, next: NextFunction): void {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    logger.error('Error occurred', {
      status,
      message,
      path: req.path,
      method: req.method,
      ip: req.ip,
      stack: err.stack,
    });

    // Handle Axios errors (Evolution API errors)
    if ((err as any).isAxiosError) {
      const axiosError = err as any;
      const evolutionStatus = axiosError.response?.status || 500;
      const evolutionMessage = axiosError.response?.data?.message || axiosError.message;
      const evolutionData = axiosError.response?.data;

      return res.status(evolutionStatus).json({
        success: false,
        error: {
          message: evolutionMessage,
          status: evolutionStatus,
          data: evolutionData,
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation Error',
          details: message,
          status: 400,
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Handle generic errors
    res.status(status).json({
      success: false,
      error: {
        message,
        status,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      },
      timestamp: new Date().toISOString(),
    });
  }

  static notFound(req: Request, res: Response, next: NextFunction): void {
    const error: ApiError = new Error(`Route not found: ${req.originalUrl}`);
    error.status = 404;
    next(error);
  }
}

export default ErrorHandler;
