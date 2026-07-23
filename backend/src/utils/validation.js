import { ApiError } from './ApiError.js';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnum(field, value, allowed, label) {
  if (value !== undefined && !allowed.includes(value)) {
    throw new ApiError(400, 'VALIDATION_ERROR', `${label} must be one of: ${allowed.join(', ')}`, [
      { field, message: `Invalid ${label.toLowerCase()}` },
    ]);
  }
}
