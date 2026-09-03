/**
 * Input Sanitization & Anti-Tampering Validation Middleware
 */

function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // remove script tags
    .replace(/[<>]/g, '') // strip raw angle brackets
    .trim();
}

function sanitizeObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => (typeof item === 'string' ? sanitizeString(item) : sanitizeObject(item)));
  }

  const clean = {};
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string') {
      clean[key] = sanitizeString(val);
    } else if (typeof val === 'object') {
      clean[key] = sanitizeObject(val);
    } else {
      clean[key] = val;
    }
  }
  return clean;
}

function sanitizeInputMiddleware(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    // Check honeypot field (bot protection)
    if (req.body._trap_bot_field) {
      return res.status(400).json({
        success: false,
        error: { code: 'BOT_DETECTED', message: 'Bot activity flagged.' },
      });
    }
    req.body = sanitizeObject(req.body);
  }

  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }

  next();
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

module.exports = {
  sanitizeString,
  sanitizeObject,
  sanitizeInputMiddleware,
  validateEmail,
};
