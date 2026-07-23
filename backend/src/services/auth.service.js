import User from '../models/User.js';
import env from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { signToken } from '../utils/jwt.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toPublicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role ?? 'agent',
    status: user.status ?? 'active',
  };
}

function validateRegisterInput({ name, email, password }) {
  const details = [];

  if (!name?.trim()) {
    details.push({ field: 'name', message: 'Name is required' });
  } else if (name.trim().length < 2) {
    details.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  if (!email?.trim()) {
    details.push({ field: 'email', message: 'Email is required' });
  } else if (!EMAIL_REGEX.test(email.trim())) {
    details.push({ field: 'email', message: 'Enter a valid email address' });
  }

  if (!password) {
    details.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 8) {
    details.push({ field: 'password', message: 'Password must be at least 8 characters' });
  }

  if (details.length > 0) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'Validation failed', details);
  }
}

function validateLoginInput({ email, password }) {
  const details = [];

  if (!email?.trim()) {
    details.push({ field: 'email', message: 'Email is required' });
  }

  if (!password) {
    details.push({ field: 'password', message: 'Password is required' });
  }

  if (details.length > 0) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'Validation failed', details);
  }
}

export async function registerUser({ name, email, password }) {
  validateRegisterInput({ name, email, password });

  const normalizedEmail = email.trim().toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail });

  if (existing) {
    throw new ApiError(409, 'CONFLICT', 'An account with this email already exists', [
      { field: 'email', message: 'An account with this email already exists' },
    ]);
  }

  const passwordHash = await User.hashPassword(password, env.bcryptRounds);
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
  });

  const token = signToken({ sub: user._id.toString(), email: user.email });

  return { user: toPublicUser(user), token };
}

export async function loginUser({ email, password }) {
  validateLoginInput({ email, password });

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'UNAUTHORIZED', 'Invalid email or password');
  }

  if (user.status === 'inactive') {
    throw new ApiError(403, 'FORBIDDEN', 'Your account has been deactivated');
  }

  const token = signToken({ sub: user._id.toString(), email: user.email });

  return { user: toPublicUser(user), token };
}

export async function getUserById(id) {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(401, 'UNAUTHORIZED', 'User not found');
  }

  return toPublicUser(user);
}
