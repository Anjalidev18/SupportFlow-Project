import User from '../models/User.js';
import env from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { EMAIL_REGEX, validateEnum } from '../utils/validation.js';
import { USER_ROLES, USER_STATUSES } from '../constants/user.js';

function toPublicMember(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role ?? 'agent',
    status: user.status ?? 'active',
    createdAt: user.createdAt,
  };
}

export async function getAllMembers() {
  const members = await User.find().sort({ createdAt: -1 }).lean();
  return members.map(toPublicMember);
}

export async function getMemberById(id) {
  const member = await User.findById(id).lean();

  if (!member) {
    throw new ApiError(404, 'NOT_FOUND', 'Team member not found');
  }

  return toPublicMember(member);
}

export async function createMember(data) {
  const { name, email, password, role, status } = data;
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

  validateEnum('role', role, USER_ROLES, 'Role');
  validateEnum('status', status, USER_STATUSES, 'Status');

  if (details.length > 0) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'Validation failed', details);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail });

  if (existing) {
    throw new ApiError(409, 'CONFLICT', 'A team member with this email already exists', [
      { field: 'email', message: 'A team member with this email already exists' },
    ]);
  }

  const passwordHash = await User.hashPassword(password, env.bcryptRounds);
  const member = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: role ?? 'agent',
    status: status ?? 'active',
  });

  return toPublicMember(member.toObject());
}

export async function updateMember(id, data) {
  const { name, email, password, role, status } = data;

  validateEnum('role', role, USER_ROLES, 'Role');
  validateEnum('status', status, USER_STATUSES, 'Status');

  const member = await User.findById(id);

  if (!member) {
    throw new ApiError(404, 'NOT_FOUND', 'Team member not found');
  }

  const details = [];

  if (name !== undefined) {
    if (!name.trim()) {
      details.push({ field: 'name', message: 'Name cannot be empty' });
    } else if (name.trim().length < 2) {
      details.push({ field: 'name', message: 'Name must be at least 2 characters' });
    } else {
      member.name = name.trim();
    }
  }

  if (email !== undefined) {
    if (!email.trim()) {
      details.push({ field: 'email', message: 'Email cannot be empty' });
    } else if (!EMAIL_REGEX.test(email.trim())) {
      details.push({ field: 'email', message: 'Enter a valid email address' });
    } else {
      const normalizedEmail = email.trim().toLowerCase();
      const existing = await User.findOne({ email: normalizedEmail, _id: { $ne: id } });

      if (existing) {
        details.push({ field: 'email', message: 'A team member with this email already exists' });
      } else {
        member.email = normalizedEmail;
      }
    }
  }

  if (password) {
    if (password.length < 8) {
      details.push({ field: 'password', message: 'Password must be at least 8 characters' });
    } else {
      member.passwordHash = await User.hashPassword(password, env.bcryptRounds);
    }
  }

  if (details.length > 0) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'Validation failed', details);
  }

  if (role !== undefined) member.role = role;
  if (status !== undefined) member.status = status;

  await member.save();

  return toPublicMember(member.toObject());
}

export async function deleteMember(id, requesterId) {
  if (id === requesterId) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'You cannot delete your own account', [
      { field: 'id', message: 'You cannot delete your own account' },
    ]);
  }

  const member = await User.findByIdAndDelete(id).lean();

  if (!member) {
    throw new ApiError(404, 'NOT_FOUND', 'Team member not found');
  }

  return toPublicMember(member);
}
