import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Sparkles,
} from 'lucide-react';

import Logo from '../components/Logo';

export default function LoginPage() {
  const { login, demoLogin, requestPasswordReset, confirmPasswordReset } = useAuth();
  const navigate = useNavigate();

  // Mode: 'login' | 'forgot_request' | 'forgot_otp' | 'register'
  const [mode, setMode] = useState('login');
  const [usernameOrEmail, setUsernameOrEmail] = useState('nikhil');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Forgot password fields
  const [resetEmail, setResetEmail] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Status & error messages
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(usernameOrEmail, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Try using the 1-Click Demo Login below.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleQuickDemo() {
    demoLogin();
    navigate('/');
  }

  async function handleSendOtp(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      const res = await requestPasswordReset(resetEmail);
      setSuccessMsg(res.message || 'Verification code sent to your email.');
      if (res.demoOtp) setResetOtp(res.demoOtp);
      setMode('forgot_otp');
    } catch (err) {
      setError(err.message || 'Could not send verification code.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      const res = await confirmPasswordReset(resetEmail, resetOtp, newPassword);
      setSuccessMsg(res.message || 'Password reset successfully! Please log in.');
      setPassword(newPassword);
      setUsernameOrEmail(resetEmail);
      setMode('login');
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#F8F9FA]">
      <div className="relative w-full max-w-md">
        {/* Top Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <span className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
              1Fi <span className="text-indigo-600">Wealth</span>
            </span>
          </Link>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Sign in to access your Wealth-Backed EMI Vault
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700 flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800 flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ================= MODE: LOGIN ================= */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Username or Email
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    placeholder="e.g. nikhil or your@email.com"
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      setSuccessMsg('');
                      setMode('forgot_request');
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full glass-input rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span>Remember me for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 py-3 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-700 hover:to-indigo-900 transition active:scale-[0.99] disabled:opacity-60"
              >
                <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Instant 1-Click Demo Login */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100/80 py-2.5 px-4 text-xs font-bold text-emerald-800 transition"
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>1-Click Demo Sign In (Nikhil Jasti)</span>
                </button>
              </div>
            </form>
          )}

          {/* ================= MODE: FORGOT PASSWORD REQUEST ================= */}
          {mode === 'forgot_request' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="text-left space-y-1">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Reset Your Password
                </h3>
                <p className="text-xs text-slate-500">
                  Enter your registered email address to receive a 6-digit verification code.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="nikhil.jasti@example.com"
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-700 hover:to-indigo-800 transition"
              >
                <span>{isLoading ? 'Sending Code...' : 'Send Verification Code'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setError('');
                  setMode('login');
                }}
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 pt-2"
              >
                ← Back to Login
              </button>
            </form>
          )}

          {/* ================= MODE: ENTER OTP & NEW PASSWORD ================= */}
          {mode === 'forgot_otp' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="text-left space-y-1">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Enter Verification Code
                </h3>
                <p className="text-xs text-slate-500">
                  Check your inbox for the 6-digit code sent to <strong className="text-slate-700">{resetEmail}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  6-Digit OTP Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={resetOtp}
                    onChange={(e) => setResetOtp(e.target.value)}
                    placeholder="849201"
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono tracking-widest text-slate-900"
                  />
                </div>
                <span className="text-[10px] text-emerald-600 mt-1 block">
                  ✓ Demo verification OTP: 849201
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  New Secure Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:from-emerald-700 hover:to-emerald-800 transition"
              >
                <span>{isLoading ? 'Resetting Password...' : 'Save New Password & Log In'}</span>
                <CheckCircle2 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 pt-2"
              >
                ← Back to Login
              </button>
            </form>
          )}

          {/* Security footnote */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Bank-grade 256-bit encryption • SEBI / CAMS authenticated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
