const crypto = require('crypto');
const { validateEmail } = require('../middleware/validation');
const { signToken } = require('../utils/tokenService');
const { setGetUserById } = require('../middleware/authMiddleware');

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
  const calcBuf = Buffer.from(calculatedHash, 'hex');
  const origBuf = Buffer.from(originalHash, 'hex');
  if (calcBuf.length !== origBuf.length) return false;
  return crypto.timingSafeEqual(calcBuf, origBuf);
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

function getUserById(id) {
  return USERS.find((u) => u.id === id) || null;
}

// Register user lookup in auth middleware
setGetUserById(getUserById);

// Active OTP store for forgot-password resets
// Key: email -> { otp: string, expiresAt: number, attempts: number }
const OTP_STORE = new Map();

function login(req, res) {
  const { usernameOrEmail, password } = req.body || {};

  if (!usernameOrEmail || !password || typeof usernameOrEmail !== 'string' || typeof password !== 'string') {
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

  // Strip passwordHash completely
  const { passwordHash, ...safeUser } = user;

  // Cryptographically signed HMAC-SHA256 bearer token
  const token = signToken({
    sub: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    kycStatus: user.kycStatus,
  });

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

  const normalizedEmail = email.toLowerCase().trim();
  const userExists = USERS.some((u) => u.email.toLowerCase() === normalizedEmail);

  // Generate cryptographically unpredictable 6-digit OTP (NO static backdoors)
  const otp = crypto.randomInt(100000, 1000000).toString();
  const TTL_MS = 10 * 60 * 1000; // 10 minutes

  if (userExists) {
    OTP_STORE.set(normalizedEmail, {
      otp,
      expiresAt: Date.now() + TTL_MS,
      attempts: 0,
    });

    // eslint-disable-next-line no-console
    console.log(`[AUTH-AUDIT] Secure OTP generated for ${normalizedEmail}. (Expires in 10m)`);
  }

  // Return standard secure response (Timing/User enumeration defense: identical message)
  const isDev = process.env.NODE_ENV !== 'production';
  res.json({
    success: true,
    message: `If that email address is registered, a 6-digit verification code has been dispatched.`,
    // In dev environment only, provide devOtpHint to facilitate local testing without an SMTP server
    ...(isDev && userExists ? { devOtpHint: otp } : {}),
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

  if (typeof newPassword !== 'string' || newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      error: { code: 'WEAK_PASSWORD', message: 'Password must be at least 8 characters in length for bank-grade security.' },
    });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const record = OTP_STORE.get(normalizedEmail);

  if (!record || Date.now() > record.expiresAt) {
    OTP_STORE.delete(normalizedEmail);
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_OR_EXPIRED_OTP', message: 'Verification code is invalid or has expired.' },
    });
  }

  // Max 5 attempts to thwart brute force
  if (record.attempts >= 5) {
    OTP_STORE.delete(normalizedEmail);
    return res.status(429).json({
      success: false,
      error: { code: 'TOO_MANY_ATTEMPTS', message: 'Too many incorrect attempts. Please request a new verification code.' },
    });
  }

  record.attempts += 1;

  const enteredOtp = String(otp).trim();
  const expectedOtp = String(record.otp);

  let isMatch = false;
  if (enteredOtp.length === expectedOtp.length) {
    isMatch = crypto.timingSafeEqual(Buffer.from(enteredOtp), Buffer.from(expectedOtp));
  }

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_OTP', message: 'Invalid verification code.' },
    });
  }

  // OTP verified successfully - invalidate OTP immediately
  OTP_STORE.delete(normalizedEmail);

  const user = USERS.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (user) {
    user.passwordHash = hashPassword(newPassword);
  }

  res.json({
    success: true,
    message: 'Your password has been successfully updated! You can now sign in with your new credentials.',
  });
}

function getCurrentUser(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: { code: 'AUTH_REQUIRED', message: 'Authentication required.' },
    });
  }

  res.json({
    success: true,
    data: req.user,
  });
}

/**
 * Direct Google Account Authentication Handler
 * Supports Google Identity Services (ID token JWT) and OAuth2 Access Token
 */
async function googleLogin(req, res) {
  const { credential, accessToken, demoGoogleUser } = req.body || {};

  let email = null;
  let name = null;
  let picture = null;
  let sub = null;

  try {
    if (credential) {
      // 1. Google Identity Services ID Token (JWT)
      const googleVerifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`;
      const googleRes = await fetch(googleVerifyUrl);

      if (!googleRes.ok) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_GOOGLE_TOKEN',
            message: 'Google identity verification failed. The provided Google ID token is invalid or expired.',
          },
        });
      }

      const payload = await googleRes.json();

      // Check configured Google Client ID audience if defined
      const expectedAudience = process.env.GOOGLE_CLIENT_ID;
      if (expectedAudience && payload.aud !== expectedAudience) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_AUDIENCE',
            message: 'Google token was not issued for this application client.',
          },
        });
      }

      if (!payload.email || (payload.email_verified !== 'true' && payload.email_verified !== true)) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'UNVERIFIED_EMAIL',
            message: 'Your Google account email has not been verified by Google.',
          },
        });
      }

      email = payload.email.toLowerCase().trim();
      name = payload.name || payload.given_name || email.split('@')[0];
      picture = payload.picture;
      sub = payload.sub;
    } else if (accessToken) {
      // 2. Google OAuth2 Access Token (via popup tokenClient)
      const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!userinfoRes.ok) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_GOOGLE_ACCESS_TOKEN',
            message: 'Failed to retrieve Google user profile with the provided access token.',
          },
        });
      }

      const payload = await userinfoRes.json();
      if (!payload.email) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'EMAIL_NOT_AVAILABLE',
            message: 'Google profile does not provide a registered email address.',
          },
        });
      }

      email = payload.email.toLowerCase().trim();
      name = payload.name || payload.given_name || email.split('@')[0];
      picture = payload.picture;
      sub = payload.sub;
    } else if (demoGoogleUser && typeof demoGoogleUser === 'object' && demoGoogleUser.email) {
      // 3. Demo / Simulation Google account mode (for rapid local preview & tests)
      email = String(demoGoogleUser.email).toLowerCase().trim();
      name = demoGoogleUser.name || 'Google Verified User';
      picture = demoGoogleUser.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
      sub = demoGoogleUser.sub || `demo-google-${Date.now()}`;
    } else {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_GOOGLE_CREDENTIAL',
          message: 'Google authentication requires a valid Google credential or access token.',
        },
      });
    }

    // Find existing user or register new Google authenticated user
    let user = USERS.find((u) => u.email.toLowerCase() === email);

    if (!user) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      user = {
        id: `google-${sub || Date.now()}`,
        googleId: sub,
        username: (email.split('@')[0] || 'investor').replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 30),
        email,
        name,
        avatar: picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        pan: `ABCPG${randomSuffix}K`,
        panMasked: `•••••${randomSuffix}K`,
        kycStatus: 'VERIFIED',
        portfolioLimit: 350000,
        authProvider: 'google',
      };
      USERS.push(user);
    } else {
      // Update Google profile details if available
      if (picture && (!user.avatar || user.avatar.includes('unsplash'))) {
        user.avatar = picture;
      }
      if (name && (!user.name || user.name === user.username)) {
        user.name = name;
      }
      if (sub && !user.googleId) {
        user.googleId = sub;
      }
      user.authProvider = user.authProvider || 'google';
    }

    // Issue standard HMAC-SHA256 signed bearer session token
    const token = signToken({
      sub: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      kycStatus: user.kycStatus,
      authProvider: user.authProvider,
    });

    const { passwordHash, ...safeUser } = user;

    return res.json({
      success: true,
      data: {
        token,
        user: safeUser,
      },
      message: 'Signed in securely with Google.',
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[Google-Auth-Error]', err);
    return res.status(500).json({
      success: false,
      error: {
        code: 'GOOGLE_AUTH_ERROR',
        message: 'An error occurred while authenticating with Google.',
      },
    });
  }
}

module.exports = {
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  hashPassword,
  verifyPassword,
  getUserById,
  USERS,
  OTP_STORE,
};
