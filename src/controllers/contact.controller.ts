import { Request, Response, NextFunction } from 'express';
import evolutionApiService from '../services/evolutionApi.service';

class ContactController {
  async listContacts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.listContacts(instanceName);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getContactDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName, contactId } = req.params;
      const data = await evolutionApiService.getContactDetails(instanceName, contactId);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async checkNumber(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { instanceName } = req.params;
      const data = await evolutionApiService.checkNumberOnWhatsApp(instanceName, req.body);
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

export default new ContactController();
