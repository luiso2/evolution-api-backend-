import { Request, Response, NextFunction } from 'express';
import evolutionApiService from '../services/evolutionApi.service';
import logger from '../utils/logger';

class ChatController {
  async listChats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.listChats(instanceName);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getChatDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName, chatId } = req.params;
      const data = await evolutionApiService.getChatDetails(instanceName, chatId);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteChat(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName, chatId } = req.params;
      const data = await evolutionApiService.deleteChat(instanceName, chatId);
      logger.info('Chat deleted', { instanceName, chatId });
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

export default new ChatController();
