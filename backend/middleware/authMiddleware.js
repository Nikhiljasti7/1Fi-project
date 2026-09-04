const { verifyToken } = require('../utils/tokenService');

// User getter will be injected or imported lazily to avoid circular require
let getUserByIdFn = null;

function setGetUserById(fn) {
  getUserByIdFn = fn;
}

function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || typeof authHeader !== 'string') return null;
  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
    return parts[1];
  }
  return null;
}

function requireAuth(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'AUTH_REQUIRED',
        message: 'Access denied. Valid Bearer authentication token is required.',
      },
    });
  }

  try {
    const decoded = verifyToken(token);
    const user = getUserByIdFn ? getUserByIdFn(decoded.sub) : null;

    if (!user) {
      // If user lookup isn't registered yet, fallback to decoded payload
      req.user = {
        id: decoded.sub,
        username: decoded.username,
        email: decoded.email,
        name: decoded.name || decoded.username,
        kycStatus: decoded.kycStatus || 'VERIFIED',
      };
    } else {
      const { passwordHash, ...safeUser } = user;
      req.user = safeUser;
    }

    next();
  } catch (err) {
    const isExpired = err.message === 'TOKEN_EXPIRED';
    return res.status(401).json({
      success: false,
      error: {
        code: isExpired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN',
        message: isExpired
          ? 'Authentication session has expired. Please sign in again.'
          : 'Invalid or forged authentication token.',
      },
    });
  }
}

function optionalAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = verifyToken(token);
    const user = getUserByIdFn ? getUserByIdFn(decoded.sub) : null;
    if (user) {
      const { passwordHash, ...safeUser } = user;
      req.user = safeUser;
    } else {
      req.user = {
        id: decoded.sub,
        username: decoded.username,
        email: decoded.email,
        name: decoded.name || decoded.username,
        kycStatus: decoded.kycStatus || 'VERIFIED',
      };
    }
  } catch {
    req.user = null;
  }
  next();
}

module.exports = {
  requireAuth,
  optionalAuth,
  setGetUserById,
  extractToken,
};
