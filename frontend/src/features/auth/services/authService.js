import axiosClient from '../../../services/axiosClient';
import { clearSession, saveSession } from './sessionStorage';

export { clearSession, getStoredSession } from './sessionStorage';

export async function fetchCurrentUser(signal) {
  const { data } = await axiosClient.get('/auth/me', { signal });
  return data.data.user;
}

export async function loginUser({ email, password }) {
  const { data } = await axiosClient.post('/auth/login', { email, password });
  return saveSession(data.data.user, data.data.token);
}

export async function registerUser({ name, email, password }) {
  const { data } = await axiosClient.post('/auth/register', { name, email, password });
  return saveSession(data.data.user, data.data.token);
}

export async function logoutUser() {
  try {
    await axiosClient.post('/auth/logout');
  } catch {
    // Clear local session even if the server request fails
  }
  clearSession();
}

export async function requestPasswordReset({ email }) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!email?.trim()) {
    throw new Error('Email is required');
  }

  return {
    message:
      'If an account exists for that email address, password reset instructions have been sent to your email.',
  };
}
