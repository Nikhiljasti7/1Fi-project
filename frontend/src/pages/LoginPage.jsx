import { useState, useEffect, useRef } from 'react';
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
  Copy,
  Check,
  ExternalLink,
  HelpCircle,
  X,
  Settings2,
} from 'lucide-react';

import Logo from '../components/Logo';

// Official 4-color Google Vector Logo
function GoogleIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const { login, loginWithGoogle, demoLogin, requestPasswordReset, confirmPasswordReset } = useAuth();
  const navigate = useNavigate();

  // Mode: 'login' | 'forgot_request' | 'forgot_otp'
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

  // Google OAuth state
  const googleBtnContainerRef = useRef(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [manualClientId, setManualClientId] = useState(() => {
    try {
      return localStorage.getItem('1fi_custom_google_client_id') || '';
    } catch {
      return '';
    }
  });

  const activeGoogleClientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    manualClientId.trim() ||
    '662901816761-f7pbodlkn54etl9c6nbsmu8il80fgbqo.apps.googleusercontent.com';

  // Initialize Google Identity Services (GIS) button and listener when client ID is available
  useEffect(() => {
    if (!activeGoogleClientId) return;

    let isMounted = true;

    function initGoogleClient() {
      if (!window.google?.accounts?.id || !isMounted) return;

      try {
        window.google.accounts.id.initialize({
          client_id: activeGoogleClientId,
          callback: async (response) => {
            if (response?.credential) {
              setIsLoading(true);
              setError('');
              try {
                await loginWithGoogle({ credential: response.credential }, rememberMe);
                navigate('/');
              } catch (err) {
                setError(err.message || 'Google sign-in failed. Please try again.');
              } finally {
                setIsLoading(false);
              }
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Optionally render the official Google button if container is present
        if (googleBtnContainerRef.current) {
          googleBtnContainerRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
            theme: 'outline',
            size: 'large',
            width: googleBtnContainerRef.current.offsetWidth || 340,
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left',
          });
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[GIS-Init-Warning]', err);
      }
    }

    if (window.google?.accounts?.id) {
      initGoogleClient();
    } else {
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(timer);
          initGoogleClient();
        }
      }, 250);
      return () => {
        isMounted = false;
        clearInterval(timer);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [activeGoogleClientId, rememberMe, loginWithGoogle, navigate]);

  // Direct click handler on the Google button
  async function handleDirectGoogleAuth() {
    setError('');

    // If client ID is configured, attempt Google Identity Services OAuth popup
    if (activeGoogleClientId && window.google?.accounts?.oauth2) {
      try {
        setIsLoading(true);
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: activeGoogleClientId,
          scope: 'openid email profile',
          callback: async (tokenResponse) => {
            if (tokenResponse?.access_token) {
              try {
                await loginWithGoogle({ accessToken: tokenResponse.access_token }, rememberMe);
                navigate('/');
              } catch (err) {
                setError(err.message || 'Failed to authenticate Google account on server.');
              } finally {
                setIsLoading(false);
              }
            } else if (tokenResponse?.error) {
              setIsLoading(false);
              if (tokenResponse.error !== 'popup_closed_by_user') {
                setError(`Google Sign-In: ${tokenResponse.error_description || tokenResponse.error}`);
              }
            }
          },
          error_callback: (err) => {
            setIsLoading(false);
            if (err?.type !== 'popup_closed') {
              setError('Google Sign-In popup was closed or blocked by browser.');
            }
          },
        });
        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (err) {
        setIsLoading(false);
        // Fallback to GIS prompt or dialog
        if (window.google?.accounts?.id) {
          window.google.accounts.id.prompt();
          return;
        }
      }
    }

    // If client ID is missing or script hasn't loaded yet, open the setup & demo modal
    setShowGoogleModal(true);
  }

  // Handle instant simulation for testing when Google Cloud Console ID is pending
  async function handleSimulateGoogleLogin(testName = 'Nikhil Jasti', testEmail = 'nikhil.jasti.google@gmail.com') {
    setError('');
    setIsLoading(true);
    setShowGoogleModal(false);
    try {
      await loginWithGoogle(
        {
          demoGoogleUser: {
            name: testName,
            email: testEmail,
            picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            sub: '10982348712903847',
          },
        },
        rememberMe
      );
      navigate('/');
    } catch (err) {
      setError(err.message || 'Simulated Google sign-in failed.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleSaveManualClientId(e) {
    e.preventDefault();
    const cleanId = manualClientId.trim();
    if (cleanId) {
      try {
        localStorage.setItem('1fi_custom_google_client_id', cleanId);
      } catch {
        // Ignore quota error
      }
      setShowGoogleModal(false);
      setSuccessMsg('Google Client ID connected! Initializing sign-in...');
      setTimeout(() => {
        handleDirectGoogleAuth();
      }, 500);
    }
  }

  function copyToClipboard(text, key) {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(usernameOrEmail, password, rememberMe);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Try using Continue with Google or 1-Click Demo below.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleQuickDemo() {
    setError('');
    setIsLoading(true);
    try {
      await demoLogin();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Demo login failed.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendOtp(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      const res = await requestPasswordReset(resetEmail);
      setSuccessMsg(res.message || 'Verification code sent to your email.');
      if (res.devOtpHint) setResetOtp(res.devOtpHint);
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
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700 flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800 flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ================= MODE: LOGIN ================= */}
          {mode === 'login' && (
            <div className="space-y-5">
              {/* PRIMARY: DIRECT GOOGLE AUTHENTICATION BUTTON */}
              <div className="space-y-2">
                <button
                  type="button"
                  id="google-direct-auth-button"
                  onClick={handleDirectGoogleAuth}
                  disabled={isLoading}
                  className="w-full relative flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50/90 py-3 px-4 text-sm font-semibold text-slate-700 shadow-sm transition active:scale-[0.99] disabled:opacity-60 hover:border-slate-400 group cursor-pointer"
                >
                  <GoogleIcon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-105" />
                  <span>Continue with Google</span>
                  <span className="hidden sm:inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 ml-auto">
                    Direct Auth
                  </span>
                </button>

                {/* Optional Google Identity Services official rendered button container */}
                <div ref={googleBtnContainerRef} className="hidden" aria-hidden="true" />

                <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
                    <span>Instant Google account sync</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowGoogleModal(true)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 hover:underline"
                  >
                    <Settings2 className="h-3 w-3" />
                    <span>{activeGoogleClientId ? 'Client Configured' : 'Setup Client ID'}</span>
                  </button>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-slate-200" />
                <span className="absolute bg-white px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  or sign in with email
                </span>
              </div>

              {/* TRADITIONAL CREDENTIALS FORM */}
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
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
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
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 py-3 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-700 hover:to-indigo-900 transition active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Instant 1-Click Demo Login */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleQuickDemo}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100/80 py-2.5 px-4 text-xs font-bold text-emerald-800 transition cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                    <span>1-Click Demo Sign In (Nikhil Jasti)</span>
                  </button>
                </div>
              </form>
            </div>
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
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-700 hover:to-indigo-800 transition cursor-pointer"
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
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 pt-2 cursor-pointer"
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
                    placeholder="Enter 6-digit code"
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono tracking-widest text-slate-900"
                  />
                </div>
                {resetOtp && (
                  <span className="text-[10px] text-emerald-600 mt-1 block">
                    ✓ Code received
                  </span>
                )}
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
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 8 characters (bank-grade)"
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:from-emerald-700 hover:to-emerald-800 transition cursor-pointer"
              >
                <span>{isLoading ? 'Resetting Password...' : 'Save New Password & Log In'}</span>
                <CheckCircle2 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 pt-2 cursor-pointer"
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

      {/* ================= GOOGLE SETUP & INSTANT TESTING MODAL ================= */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <GoogleIcon className="h-5 w-5" />
                <h3 className="font-display font-bold text-base text-slate-900">
                  Google Account Authentication Setup
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Option 1: Instant Test Simulation */}
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 space-y-3">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                      Option 1: Instant Google Account Preview
                    </h4>
                    <p className="text-xs text-indigo-700 mt-0.5">
                      Test the direct Google sign-in workflow immediately with verified profile, avatar, and pre-allocated financial vault.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSimulateGoogleLogin('Nikhil Jasti', 'nikhil.jasti.google@gmail.com')}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 px-4 shadow-sm transition"
                >
                  <GoogleIcon className="h-4 w-4" />
                  <span>Sign In as Nikhil Jasti (Google Account)</span>
                </button>
              </div>

              {/* Option 2: Live Google Cloud Console Client ID */}
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Option 2: Connect Live Google Cloud OAuth Client ID
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      To authenticate your real personal Google account on{' '}
                      <span className="font-semibold text-indigo-600">https://1-fi-project-frontend.vercel.app</span> or localhost, enter your Google Client ID below:
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveManualClientId} className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Google OAuth 2.0 Web Client ID
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualClientId}
                      onChange={(e) => setManualClientId(e.target.value)}
                      placeholder="e.g. 123456789-abc.apps.googleusercontent.com"
                      className="flex-1 glass-input rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                    />
                    <button
                      type="submit"
                      disabled={!manualClientId.trim()}
                      className="rounded-xl bg-slate-900 text-white px-4 py-2 text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition"
                    >
                      Connect
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Or define <code className="text-indigo-600 font-mono">VITE_GOOGLE_CLIENT_ID</code> in frontend/.env and Vercel Environment Variables.
                  </p>
                </form>

                {/* Google Cloud Console URIs to copy */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Google Cloud Console Settings Guide</span>
                    <a
                      href="https://console.cloud.google.com/apis/credentials"
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline inline-flex items-center gap-1 text-[11px]"
                    >
                      <span>Open Console</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  {/* Origins */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Authorized JavaScript Origins:
                    </span>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
                        <span className="text-slate-800 truncate">https://1-fi-project-frontend.vercel.app</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('https://1-fi-project-frontend.vercel.app', 'origin_prod')}
                          className="text-slate-400 hover:text-indigo-600 p-1"
                          title="Copy origin"
                        >
                          {copiedKey === 'origin_prod' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
                        <span className="text-slate-800">http://localhost:5173</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('http://localhost:5173', 'origin_local')}
                          className="text-slate-400 hover:text-indigo-600 p-1"
                          title="Copy origin"
                        >
                          {copiedKey === 'origin_local' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Redirect URIs */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Authorized Redirect URIs:
                    </span>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
                        <span className="text-slate-800 truncate">https://1-fi-project-frontend.vercel.app/login</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('https://1-fi-project-frontend.vercel.app/login', 'redirect_prod')}
                          className="text-slate-400 hover:text-indigo-600 p-1"
                          title="Copy redirect URI"
                        >
                          {copiedKey === 'redirect_prod' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
                        <span className="text-slate-800">http://localhost:5173/login</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('http://localhost:5173/login', 'redirect_local')}
                          className="text-slate-400 hover:text-indigo-600 p-1"
                          title="Copy redirect URI"
                        >
                          {copiedKey === 'redirect_local' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
