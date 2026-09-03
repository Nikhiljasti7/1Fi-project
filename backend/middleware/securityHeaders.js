/**
 * Production Security Headers Middleware (OWASP & PCI-DSS compliant)
 * Equivalent to Helmet without unnecessary external dependencies.
 */
function securityHeaders(req, res, next) {
  // Prevent MIME-type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevent Clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Cross-site scripting filter
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Force HTTPS / HSTS (1 year + preload)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Control referrer information leakage
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Restrict permissions / features
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Remove Express fingerprint
  res.removeHeader('X-Powered-By');

  next();
}

module.exports = securityHeaders;
