import { ApiError } from '../utils/ApiError.js';
import { verifyToken } from '../utils/jwt.js';
import * as authService from '../services/auth.service.js';

export async function authenticate(req, _res, next) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith('Bearer ')) {
      throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
    }

    const token = header.slice(7);
    const payload = verifyToken(token);
    const user = await authService.getUserById(payload.sub);

    if (user.status === 'inactive') {
      throw new ApiError(401, 'UNAUTHORIZED', 'Account is inactive');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }

    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'UNAUTHORIZED', 'Invalid or expired token'));
    }

    next(error);
  }
}
