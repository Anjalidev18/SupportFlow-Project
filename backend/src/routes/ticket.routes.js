import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.js';
import * as ticketController from '../controllers/ticket.controller.js';

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(ticketController.listTickets));
router.get('/:id', asyncHandler(ticketController.getTicket));
router.post('/', asyncHandler(ticketController.createTicket));
router.put('/:id', asyncHandler(ticketController.updateTicket));
router.delete('/:id', asyncHandler(ticketController.deleteTicket));

export default router;
