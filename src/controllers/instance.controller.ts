import { Request, Response, NextFunction } from 'express';
import evolutionApiService from '../services/evolutionApi.service';
import logger from '../utils/logger';

class InstanceController {
  async listInstances(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await evolutionApiService.listInstances();
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async createInstance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await evolutionApiService.createInstance(req.body);
      logger.info('Instance created', { instanceName: req.body.instanceName });
      res.status(201).json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getInstanceDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.getInstanceDetails(instanceName);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteInstance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.deleteInstance(instanceName);
      logger.info('Instance deleted', { instanceName });
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getInstanceStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.getInstanceStatus(instanceName);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async connectInstance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.connectInstance(instanceName);
      logger.info('Instance connection requested', { instanceName });
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async disconnectInstance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.disconnectInstance(instanceName);
      logger.info('Instance disconnected', { instanceName });
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

export default new InstanceController();
