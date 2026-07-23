import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.js';
import * as teamController from '../controllers/team.controller.js';

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(teamController.listMembers));
router.get('/:id', asyncHandler(teamController.getMember));
router.post('/', asyncHandler(teamController.createMember));
router.put('/:id', asyncHandler(teamController.updateMember));
router.delete('/:id', asyncHandler(teamController.deleteMember));

export default router;
