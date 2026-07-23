import axios from 'axios';
import {
  clearSession,
  getStoredSession,
} from '../features/auth/services/sessionStorage';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const session = getStoredSession();
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/register');

    if (error.response?.status === 401 && !isAuthRoute) {
      const session = getStoredSession();
      const authHeader =
        error.config?.headers?.Authorization ?? error.config?.headers?.authorization;
      const requestToken =
        typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
          ? authHeader.slice(7)
          : null;

      // Only clear when the failed request used the current session token.
      // Stale in-flight requests (e.g. bootstrap /auth/me before re-login) must not wipe a new session.
      if (session?.token && requestToken === session.token) {
        clearSession();
        window.dispatchEvent(new Event('auth:logout'));
      }
    }

    const message =
      error.response?.data?.error?.message ||
      error.message ||
      'An unexpected error occurred';
    const apiError = new Error(message);
    if (error.response?.data?.error?.details) {
      apiError.details = error.response.data.error.details;
    }
    return Promise.reject(apiError);
  }
);

export default axiosClient;
