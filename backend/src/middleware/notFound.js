import { ApiError } from '../utils/ApiError.js';

export function notFound(_req, _res, next) {
  next(new ApiError(404, 'NOT_FOUND', 'The requested resource was not found'));
}
