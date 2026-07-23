import { TICKET_PRIORITIES, TICKET_STATUSES } from '../constants';
import { hasErrors } from '../../../utils/validation';

export function validateTicketForm({ title, description, status, priority }, { requireStatus = false } = {}) {
  const errors = {};

  if (!title?.trim()) {
    errors.title = 'Title is required';
  } else if (title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (title.trim().length > 200) {
    errors.title = 'Title must not exceed 200 characters';
  }

  if (!description?.trim()) {
    errors.description = 'Description is required';
  } else if (description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  } else if (description.trim().length > 10000) {
    errors.description = 'Description must not exceed 10,000 characters';
  }

  if (priority && !TICKET_PRIORITIES.includes(priority)) {
    errors.priority = 'Select a valid priority';
  }

  if (requireStatus && status && !TICKET_STATUSES.includes(status)) {
    errors.status = 'Select a valid status';
  }

  return errors;
}

export { hasErrors };
