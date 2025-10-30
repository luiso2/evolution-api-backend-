import { Router } from 'express';
import chatController from '../controllers/chat.controller';
import { instanceNameValidator } from '../middleware/validators';

const router = Router({ mergeParams: true });

router.get('/', instanceNameValidator, chatController.listChats);
router.get('/:chatId', instanceNameValidator, chatController.getChatDetails);
router.delete('/:chatId', instanceNameValidator, chatController.deleteChat);

export default router;
