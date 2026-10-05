/**
 * Production Security Headers Middleware (OWASP & PCI-DSS compliant)
 * Equivalent to Helmet with full Content Security Policy and Cache-Control protection.
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

  // Cross-Origin Isolation (allow popups for Google OAuth/Identity Services)
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');

  // Content Security Policy (OWASP Level 2 with Google Auth support)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://accounts.google.com https://apis.google.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https: blob: https://*.googleusercontent.com https://lh3.googleusercontent.com; " +
    "frame-src 'self' https://accounts.google.com; " +
    "connect-src 'self' http://localhost:* ws://localhost:* https: https://accounts.google.com https://oauth2.googleapis.com https://www.googleapis.com; " +
    "frame-ancestors 'none'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self';"
  );

  // Prevent caching of sensitive financial / authentication data
  const path = req.path || '';
  if (path.includes('/auth') || path.includes('/orders') || path.includes('/wealth')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  // Remove Express fingerprint
  res.removeHeader('X-Powered-By');

  next();
}

module.exports = securityHeaders;
