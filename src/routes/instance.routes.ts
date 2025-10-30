import { Router } from 'express';
import instanceController from '../controllers/instance.controller';
import {
  createInstanceValidator,
  instanceNameValidator
} from '../middleware/validators';

const router = Router();

router.get('/', instanceController.listInstances);
router.post('/', createInstanceValidator, instanceController.createInstance);
router.get('/:instanceName', instanceNameValidator, instanceController.getInstanceDetails);
router.delete('/:instanceName', instanceNameValidator, instanceController.deleteInstance);
router.get('/:instanceName/status', instanceNameValidator, instanceController.getInstanceStatus);
router.post('/:instanceName/connect', instanceNameValidator, instanceController.connectInstance);
router.post('/:instanceName/disconnect', instanceNameValidator, instanceController.disconnectInstance);

export default router;
