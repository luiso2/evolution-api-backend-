import { Router } from 'express';
import contactController from '../controllers/contact.controller';
import {
  instanceNameValidator,
  checkNumberValidator
} from '../middleware/validators';

const router = Router({ mergeParams: true });

router.get('/', instanceNameValidator, contactController.listContacts);
router.get('/:contactId', instanceNameValidator, contactController.getContactDetails);
router.post('/check', instanceNameValidator, checkNumberValidator, contactController.checkNumber);

export default router;
