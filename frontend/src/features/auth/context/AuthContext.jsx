import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  clearSession,
  fetchCurrentUser,
  getStoredSession,
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function bootstrap() {
      const session = getStoredSession();

      if (!session?.token) {
        setIsLoading(false);
        return;
      }

      const bootstrapToken = session.token;

      try {
        const currentUser = await fetchCurrentUser(controller.signal);
        setUser(currentUser);
      } catch (err) {
        if (controller.signal.aborted || err.code === 'ERR_CANCELED') {
          return;
        }

        const current = getStoredSession();
        if (current?.token === bootstrapToken) {
          clearSession();
          setUser(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    bootstrap();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    function handleAuthLogout() {
      setUser(null);
    }

    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, []);

  const login = useCallback(async (credentials) => {
    const session = await loginUser(credentials);
    setUser(session.user);
    return session;
  }, []);

  const register = useCallback(async (data) => {
    const session = await registerUser(data);
    setUser(session.user);
    return session;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const forgotPassword = useCallback(async (data) => {
    return requestPasswordReset(data);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
      forgotPassword,
    }),
    [user, isLoading, login, register, logout, forgotPassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
