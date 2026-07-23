import env from '../config/env.js';

export function errorHandler(err, _req, res, _next) {
  let statusCode = err.statusCode || 500;
  let code = err.code || 'INTERNAL_ERROR';
  let message = err.message || 'An unexpected error occurred';
  let details = err.details || null;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = 'Validation failed';
    details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    code = 'INVALID_ID';
    message = 'Invalid ID format';
  }

  if (err.code === 11000) {
    statusCode = 409;
    code = 'CONFLICT';
    message = 'A record with this value already exists';
    const field = Object.keys(err.keyPattern || {})[0];
    if (field) {
      details = [{ field, message: `${field} is already in use` }];
    }
  }

  if (!env.isProduction) {
    console.error(err);
  }

  res.status(statusCode).json({
    error: {
      code,
      message,
      ...(details && { details }),
      ...(!env.isProduction && err.stack && { stack: err.stack }),
    },
  });
}
