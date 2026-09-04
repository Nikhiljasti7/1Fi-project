const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || '1fi-enterprise-fintech-jwt-hmac-sha256-secret-key-2026';

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return Buffer.from(str, 'base64').toString('utf8');
}

/**
 * Creates a cryptographically signed HMAC-SHA256 token
 */
function signToken(payload, expiresInMs = 24 * 60 * 60 * 1000) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Date.now() + expiresInMs;
  const fullPayload = { ...payload, exp, iat: Date.now() };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

  const dataToSign = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(dataToSign)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${dataToSign}.${signature}`;
}

/**
 * Verifies and decodes an HMAC-SHA256 token using constant-time comparison
 */
function verifyToken(token) {
  if (!token || typeof token !== 'string') {
    throw new Error('TOKEN_MISSING');
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('MALFORMED_TOKEN');
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const expectedSignature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(dataToSign)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const sigBuf = Buffer.from(signature);
  const expectedSigBuf = Buffer.from(expectedSignature);

  if (sigBuf.length !== expectedSigBuf.length || !crypto.timingSafeEqual(sigBuf, expectedSigBuf)) {
    throw new Error('INVALID_SIGNATURE');
  }

  let payload;
  try {
    payload = JSON.parse(base64UrlDecode(encodedPayload));
  } catch {
    throw new Error('INVALID_PAYLOAD');
  }

  if (payload.exp && Date.now() > payload.exp) {
    throw new Error('TOKEN_EXPIRED');
  }

  return payload;
}

module.exports = {
  signToken,
  verifyToken,
  base64UrlEncode,
  base64UrlDecode,
};
