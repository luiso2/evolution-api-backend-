import { Router } from 'express';
import groupController from '../controllers/group.controller';
import {
  instanceNameValidator,
  createGroupValidator,
  updateGroupParticipantsValidator,
} from '../middleware/validators';

const router = Router({ mergeParams: true });

router.get('/', instanceNameValidator, groupController.listGroups);
router.get('/:groupId', instanceNameValidator, groupController.getGroupDetails);
router.post('/', instanceNameValidator, createGroupValidator, groupController.createGroup);
router.post(
  '/:groupId/participants',
  instanceNameValidator,
  updateGroupParticipantsValidator,
  groupController.updateParticipants
);

export default router;
