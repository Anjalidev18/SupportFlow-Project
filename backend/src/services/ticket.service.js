import Ticket from '../models/Ticket.js';
import { ApiError } from '../utils/ApiError.js';
import { validateEnum } from '../utils/validation.js';
import { TICKET_STATUSES, TICKET_PRIORITIES } from '../constants/ticket.js';

function validateTitle(title) {
  if (!title?.trim()) {
    return 'Title is required';
  }
  if (title.trim().length < 3) {
    return 'Title must be at least 3 characters';
  }
  if (title.trim().length > 200) {
    return 'Title must not exceed 200 characters';
  }
  return null;
}

function validateDescription(description) {
  if (!description?.trim()) {
    return 'Description is required';
  }
  if (description.trim().length < 10) {
    return 'Description must be at least 10 characters';
  }
  return null;
}

export async function getAllTickets() {
  return Ticket.find().sort({ createdAt: -1 }).lean();
}

export async function getTicketById(id) {
  const ticket = await Ticket.findById(id).lean();
  if (!ticket) {
    throw new ApiError(404, 'NOT_FOUND', 'Ticket not found');
  }
  return ticket;
}

export async function createTicket(data, userId) {
  const { title, description, status, priority } = data;

  if (!userId) {
    throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
  }

  const details = [];
  const titleError = validateTitle(title);
  const descriptionError = validateDescription(description);

  if (titleError) details.push({ field: 'title', message: titleError });
  if (descriptionError) details.push({ field: 'description', message: descriptionError });

  if (details.length > 0) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'Validation failed', details);
  }

  validateEnum('status', status, TICKET_STATUSES, 'Status');
  validateEnum('priority', priority, TICKET_PRIORITIES, 'Priority');

  const ticket = await Ticket.create({
    title: title.trim(),
    description: description.trim(),
    createdBy: userId,
    ...(status && { status }),
    ...(priority && { priority }),
  });

  return ticket.toObject();
}

export async function updateTicket(id, data) {
  const { title, description, status, priority } = data;

  validateEnum('status', status, TICKET_STATUSES, 'Status');
  validateEnum('priority', priority, TICKET_PRIORITIES, 'Priority');

  const updates = {};

  if (title !== undefined) {
    const titleError = validateTitle(title);
    if (titleError) {
      throw new ApiError(400, 'VALIDATION_ERROR', titleError, [
        { field: 'title', message: titleError },
      ]);
    }
    updates.title = title.trim();
  }

  if (description !== undefined) {
    const descriptionError = validateDescription(description);
    if (descriptionError) {
      throw new ApiError(400, 'VALIDATION_ERROR', descriptionError, [
        { field: 'description', message: descriptionError },
      ]);
    }
    updates.description = description.trim();
  }

  if (status !== undefined) updates.status = status;
  if (priority !== undefined) updates.priority = priority;

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'No valid fields provided for update');
  }

  const ticket = await Ticket.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).lean();

  if (!ticket) {
    throw new ApiError(404, 'NOT_FOUND', 'Ticket not found');
  }

  return ticket;
}

export async function deleteTicket(id) {
  const ticket = await Ticket.findByIdAndDelete(id).lean();
  if (!ticket) {
    throw new ApiError(404, 'NOT_FOUND', 'Ticket not found');
  }
  return ticket;
}
