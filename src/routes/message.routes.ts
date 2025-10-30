import { Router } from 'express';
import messageController from '../controllers/message.controller';
import {
  instanceNameValidator,
  sendTextMessageValidator,
  sendMediaMessageValidator,
  sendListMessageValidator,
  sendButtonMessageValidator,
} from '../middleware/validators';

const router = Router({ mergeParams: true });

router.post(
  '/send',
  instanceNameValidator,
  sendTextMessageValidator,
  messageController.sendTextMessage
);

router.post(
  '/sendMedia',
  instanceNameValidator,
  sendMediaMessageValidator,
  messageController.sendMediaMessage
);

router.get(
  '/list',
  instanceNameValidator,
  messageController.listMessages
);

router.post(
  '/sendList',
  instanceNameValidator,
  sendListMessageValidator,
  messageController.sendListMessage
);

router.post(
  '/sendButtons',
  instanceNameValidator,
  sendButtonMessageValidator,
  messageController.sendButtonMessage
);

export default router;
