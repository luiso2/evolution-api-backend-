import { Router } from 'express';
import webhookController from '../controllers/webhook.controller';
import {
  instanceNameValidator,
  setWebhookValidator,
} from '../middleware/validators';

const router = Router({ mergeParams: true });

router.get('/', instanceNameValidator, webhookController.getWebhook);
router.post('/', instanceNameValidator, setWebhookValidator, webhookController.setWebhook);
router.delete('/', instanceNameValidator, webhookController.deleteWebhook);

export default router;
