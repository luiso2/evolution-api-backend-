import { Request, Response, NextFunction } from 'express';
import evolutionApiService from '../services/evolutionApi.service';
import logger from '../utils/logger';

class MessageController {
  async sendTextMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.sendTextMessage(instanceName, req.body);
      logger.info('Text message sent', { instanceName, to: req.body.number });
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async sendMediaMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.sendMediaMessage(instanceName, req.body);
      logger.info('Media message sent', {
        instanceName,
        to: req.body.number,
        mediaType: req.body.mediatype
      });
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async listMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const { chatId } = req.query;

      if (!chatId || typeof chatId !== 'string') {
        res.status(400).json({
          success: false,
          error: {
            message: 'chatId query parameter is required',
          },
        });
        return;
      }

      const data = await evolutionApiService.listMessages(instanceName, chatId);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async sendListMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.sendListMessage(instanceName, req.body);
      logger.info('List message sent', { instanceName, to: req.body.number });
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async sendButtonMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.sendButtonMessage(instanceName, req.body);
      logger.info('Button message sent', { instanceName, to: req.body.number });
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MessageController();
