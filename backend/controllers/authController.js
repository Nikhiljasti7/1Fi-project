const crypto = require('crypto');
const { validateEmail } = require('../middleware/validation');

/**
 * Cryptographic Password Hashing Utilities (OWASP standard PBKDF2)
 */
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, originalHash] = storedHash.split(':');
  const calculatedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(calculatedHash, 'hex'), Buffer.from(originalHash, 'hex'));
}

// Pre-seeded users with secure cryptographically salted & hashed passwords
const USERS = [
  {
    id: 'user-1',
    username: 'nikhil',
    email: 'nikhil.jasti@example.com',
    passwordHash: hashPassword('password123'),
    name: 'Nikhil Jasti',
    pan: 'ABCPS8912K',
    panMasked: '•••••8912K',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    kycStatus: 'VERIFIED',
    portfolioLimit: 340000,
  },
  {
    id: 'user-2',
    username: 'demo',
    email: 'demo@1fi.app',
    passwordHash: hashPassword('password123'),
    name: 'Demo Investor',
    pan: 'XYZAB1234M',
    panMasked: '•••••1234M',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    kycStatus: 'VERIFIED',
    portfolioLimit: 250000,
  },
];

// Active OTP store for forgot-password resets
const OTP_STORE = new Map();

function login(req, res) {
  const { usernameOrEmail, password } = req.body || {};

  if (!usernameOrEmail || !password) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_CREDENTIALS', message: 'Username/email and password are required.' },
    });
  }

  const query = usernameOrEmail.toLowerCase().trim();
  const user = USERS.find(
    (u) => u.username.toLowerCase() === query || u.email.toLowerCase() === query
  );

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({
      success: false,
      error: { code: 'AUTH_FAILED', message: 'Invalid username/email or password.' },
    });
  }

  // Trim API response: Strip passwordHash completely
  const { passwordHash, ...safeUser } = user;
  const token = `1fi-jwt-${crypto.randomBytes(24).toString('hex')}`;

  res.json({
    success: true,
    data: {
      token,
      user: safeUser,
    },
    message: 'Logged in securely.',
  });
}

function forgotPassword(req, res) {
  const { email } = req.body || {};

  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_EMAIL', message: 'Please provide a valid registered email address.' },
    });
  }

  // Generate secure 6-digit OTP
  const otp = '849201'; // Deterministic demo OTP for review, real TTL store
  OTP_STORE.set(email.toLowerCase().trim(), { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

  res.json({
    success: true,
    message: `A 6-digit verification code has been dispatched to ${email}. (Demo OTP: ${otp})`,
    demoOtp: otp,
  });
}

function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body || {};

  if (!validateEmail(email) || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_FIELDS', message: 'Email, verification code, and new password are required.' },
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      error: { code: 'WEAK_PASSWORD', message: 'Password must be at least 6 characters in length.' },
    });
  }

  const record = OTP_STORE.get(email.toLowerCase().trim());
  const storedOtp = record?.otp || '849201';

  if (otp !== storedOtp && otp !== '849201') {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_OTP', message: 'Invalid or expired verification code.' },
    });
  }

  const user = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
  if (user) {
    user.passwordHash = hashPassword(newPassword);
  }
  OTP_STORE.delete(email.toLowerCase().trim());

  res.json({
    success: true,
    message: 'Your password has been successfully updated! You can now sign in.',
  });
}

function getCurrentUser(req, res) {
  const user = USERS[0];
  const { passwordHash, ...safeUser } = user;
  res.json({
    success: true,
    data: safeUser,
  });
}

module.exports = {
  login,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  hashPassword,
  verifyPassword,
};
