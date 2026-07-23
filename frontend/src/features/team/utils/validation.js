import { MEMBER_ROLES, MEMBER_STATUSES } from '../constants';
import { hasErrors } from '../../../utils/validation';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateMemberForm(
  { name, email, password, role, status },
  { isEdit = false } = {}
) {
  const errors = {};

  if (!name?.trim()) {
    errors.name = 'Name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email?.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!isEdit) {
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
  } else if (password && password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (role && !MEMBER_ROLES.includes(role)) {
    errors.role = 'Select a valid role';
  }

  if (status && !MEMBER_STATUSES.includes(status)) {
    errors.status = 'Select a valid status';
  }

  return errors;
}

export { hasErrors };
