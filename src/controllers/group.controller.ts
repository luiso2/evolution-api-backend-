import { Request, Response, NextFunction } from 'express';
import evolutionApiService from '../services/evolutionApi.service';
import logger from '../utils/logger';

class GroupController {
  async listGroups(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.listGroups(instanceName);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getGroupDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName, groupId } = req.params;
      const data = await evolutionApiService.getGroupDetails(instanceName, groupId);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async createGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.createGroup(instanceName, req.body);
      logger.info('Group created', { instanceName, subject: req.body.subject });
      res.status(201).json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async updateParticipants(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.updateGroupParticipants(instanceName, req.body);
      logger.info('Group participants updated', {
        instanceName,
        groupJid: req.body.groupJid,
        action: req.body.action
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
}

export default new GroupController();
