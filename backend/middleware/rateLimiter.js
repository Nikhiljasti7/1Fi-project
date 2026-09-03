/**
 * In-memory sliding-window rate limiter.
 * Protects against brute-force password guessing, credential stuffing, and DDoS.
 */
function createRateLimiter({ windowMs = 60 * 1000, max = 5, message = 'Too many requests, please try again later.' }) {
  const requests = new Map();

  // Periodic cleanup every 2 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of requests.entries()) {
      if (now - record.startTime > windowMs) {
        requests.delete(ip);
      }
    }
  }, 2 * 60 * 1000).unref();

  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    let record = requests.get(ip);
    if (!record || now - record.startTime > windowMs) {
      record = { count: 1, startTime: now };
      requests.set(ip, record);
      return next();
    }

    record.count += 1;
    if (record.count > max) {
      const retryAfterSeconds = Math.ceil((record.startTime + windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message,
          retryAfter: `${retryAfterSeconds}s`,
        },
      });
    }

    next();
  };
}

const authLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 attempts per minute
  message: 'Too many authentication attempts. Please wait 1 minute before trying again.',
});

const orderLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 15,
  message: 'Loan submission rate limit reached. Please wait a moment before trying again.',
});

module.exports = {
  createRateLimiter,
  authLimiter,
  orderLimiter,
};
