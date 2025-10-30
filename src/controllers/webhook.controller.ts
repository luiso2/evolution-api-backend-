import { Request, Response, NextFunction } from 'express';
import evolutionApiService from '../services/evolutionApi.service';
import logger from '../utils/logger';

class WebhookController {
  async getWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.getWebhook(instanceName);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async setWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.setWebhook(instanceName, req.body);
      logger.info('Webhook configured', { instanceName, url: req.body.url });
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.deleteWebhook(instanceName);
      logger.info('Webhook removed', { instanceName });
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

export default new WebhookController();
