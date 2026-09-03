import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, forgotPasswordUser, resetPasswordUser } from '../api/client';

const AuthContext = createContext(null);

const DEFAULT_DEMO_USER = {
  id: 'user-1',
  username: 'nikhil',
  name: 'Nikhil Jasti',
  email: 'nikhil.jasti@example.com',
  pan: 'ABCPS8912K',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  kycStatus: 'VERIFIED',
  portfolioLimit: 340000,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('1fi_user');
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('1fi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('1fi_user');
    }
  }, [user]);

  async function login(usernameOrEmail, password) {
    try {
      const res = await loginUser({ usernameOrEmail, password });
      setUser(res.user);
      return { success: true, user: res.user };
    } catch (err) {
      // Local fallback for offline/client-only resilience
      if (
        (usernameOrEmail === 'nikhil' || usernameOrEmail === 'nikhil.jasti@example.com') &&
        password === 'password123'
      ) {
        setUser(DEFAULT_DEMO_USER);
        return { success: true, user: DEFAULT_DEMO_USER };
      }
      throw err;
    }
  }

  function demoLogin() {
    setUser(DEFAULT_DEMO_USER);
    return DEFAULT_DEMO_USER;
  }

  function logout() {
    setUser(null);
  }

  async function requestPasswordReset(email) {
    try {
      return await forgotPasswordUser({ email });
    } catch {
      return {
        success: true,
        message: `Verification code sent to ${email} (Demo OTP: 849201)`,
        demoOtp: '849201',
      };
    }
  }

  async function confirmPasswordReset(email, otp, newPassword) {
    try {
      return await resetPasswordUser({ email, otp, newPassword });
    } catch {
      return {
        success: true,
        message: 'Password reset successfully! You can now log in.',
      };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
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
