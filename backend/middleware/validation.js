/**
 * Input Sanitization, Anti-Tampering & Prototype Pollution Defense Middleware
 */

const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/\0/g, '') // Strip null bytes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/[<>]/g, '') // Strip raw angle brackets
    .replace(/javascript\s*:/gi, '') // Strip javascript: protocol
    .replace(/vbscript\s*:/gi, '') // Strip vbscript: protocol
    .trim();
}

function sanitizeObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return typeof obj === 'string' ? sanitizeString(obj) : obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  }

  const clean = Object.create(null); // Pure dictionary without prototype

  for (const [key, val] of Object.entries(obj)) {
    // Block Prototype Pollution
    if (FORBIDDEN_KEYS.has(key)) {
      continue;
    }

    const cleanKey = sanitizeString(key);
    if (!cleanKey) continue;

    if (typeof val === 'string') {
      clean[cleanKey] = sanitizeString(val);
    } else if (typeof val === 'object' && val !== null) {
      clean[cleanKey] = sanitizeObject(val);
    } else {
      clean[cleanKey] = val;
    }
  }

  // Convert back to regular object safely
  return Object.assign({}, clean);
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

  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeObject(req.params);
  }

  next();
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

module.exports = {
  sanitizeString,
  sanitizeObject,
  sanitizeInputMiddleware,
  validateEmail,
  FORBIDDEN_KEYS,
};
