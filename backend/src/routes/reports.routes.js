import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.js';
import * as reportsController from '../controllers/reports.controller.js';

const router = Router();

router.get('/', authenticate, asyncHandler(reportsController.getReports));

export default router;
