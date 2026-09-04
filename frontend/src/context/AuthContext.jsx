import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  loginUser,
  forgotPasswordUser,
  resetPasswordUser,
  getCurrentUser,
  getAuthToken,
  clearAuthToken,
} from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const token = getAuthToken();
      const savedUser = localStorage.getItem('1fi_user');
      if (token && savedUser) {
        return JSON.parse(savedUser);
      }
      return null;
    } catch {
      return null;
    }
  });

  const [authLoading, setAuthLoading] = useState(false);

  const logout = useCallback(() => {
    clearAuthToken();
    localStorage.removeItem('1fi_user');
    setUser(null);
  }, []);

  // Listen for 401 session expiration from API client
  useEffect(() => {
    function handleExpired() {
      logout();
    }
    window.addEventListener('1fi-auth-expired', handleExpired);
    return () => window.removeEventListener('1fi-auth-expired', handleExpired);
  }, [logout]);

  // Validate active token with server on mount if token exists
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      getCurrentUser()
        .then((userData) => {
          if (userData) {
            setUser(userData);
            localStorage.setItem('1fi_user', JSON.stringify(userData));
          }
        })
        .catch(() => {
          // If token is invalid or server rejects, clear session
          logout();
        });
    }
  }, [logout]);

  async function login(usernameOrEmail, password, rememberMe = true) {
    setAuthLoading(true);
    try {
      const res = await loginUser({ usernameOrEmail, password }, rememberMe);
      const safeUser = res.user;
      setUser(safeUser);
      localStorage.setItem('1fi_user', JSON.stringify(safeUser));
      return { success: true, user: safeUser };
    } finally {
      setAuthLoading(false);
    }
  }

  async function demoLogin() {
    setAuthLoading(true);
    try {
      // Authenticates with backend and retrieves authentic signed HMAC bearer token
      const res = await loginUser({ usernameOrEmail: 'nikhil', password: 'password123' }, true);
      const safeUser = res.user;
      setUser(safeUser);
      localStorage.setItem('1fi_user', JSON.stringify(safeUser));
      return safeUser;
    } finally {
      setAuthLoading(false);
    }
  }

  async function requestPasswordReset(email) {
    return await forgotPasswordUser({ email });
  }

  async function confirmPasswordReset(email, otp, newPassword) {
    return await resetPasswordUser({ email, otp, newPassword });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user && getAuthToken()),
        authLoading,
        login,
        demoLogin,
        logout,
        requestPasswordReset,
        confirmPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
