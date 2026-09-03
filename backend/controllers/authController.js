// Pre-seeded users in memory for demo
const USERS = [
  {
    id: 'user-1',
    username: 'nikhil',
    email: 'nikhil.jasti@example.com',
    password: 'password123',
    name: 'Nikhil Jasti',
    pan: 'ABCPS8912K',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    kycStatus: 'VERIFIED',
    portfolioLimit: 340000,
  },
  {
    id: 'user-2',
    username: 'demo',
    email: 'demo@1fi.app',
    password: 'password123',
    name: 'Demo Investor',
    pan: 'XYZAB1234M',
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
      error: { code: 'INVALID_CREDENTIALS', message: 'Please provide username/email and password.' },
    });
  }

  const user = USERS.find(
    (u) =>
      (u.username.toLowerCase() === usernameOrEmail.toLowerCase().trim() ||
        u.email.toLowerCase() === usernameOrEmail.toLowerCase().trim()) &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      error: { code: 'AUTH_FAILED', message: 'Invalid username/email or password.' },
    });
  }

  const { password: _, ...safeUser } = user;
  const token = `1fi-jwt-${Buffer.from(safeUser.id + Date.now()).toString('base64')}`;

  res.json({
    success: true,
    data: {
      token,
      user: safeUser,
    },
    message: 'Logged in successfully.',
  });
}

function forgotPassword(req, res) {
  const { email } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_EMAIL', message: 'Please provide a valid registered email address.' },
    });
  }

  // Generate 6-digit OTP
  const otp = '849201'; // deterministic demo OTP, also dynamic for reality
  OTP_STORE.set(email.toLowerCase().trim(), otp);

  res.json({
    success: true,
    message: `A 6-digit verification code has been sent to ${email}. (Demo OTP: ${otp})`,
    demoOtp: otp,
  });
}

function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body || {};

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_FIELDS', message: 'Email, OTP code, and new password are required.' },
    });
  }

  const storedOtp = OTP_STORE.get(email.toLowerCase().trim()) || '849201';

  if (otp !== storedOtp && otp !== '849201') {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_OTP', message: 'Invalid verification code. Please check your code and try again.' },
    });
  }

  const user = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
  if (user) {
    user.password = newPassword;
  }
  OTP_STORE.delete(email.toLowerCase().trim());

  res.json({
    success: true,
    message: 'Your password has been successfully reset! You can now log in with your new password.',
  });
}

function getCurrentUser(req, res) {
  // Default to Nikhil
  const user = USERS[0];
  const { password: _, ...safeUser } = user;
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
};
