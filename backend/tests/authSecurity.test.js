const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, verifyPassword } = require('../controllers/authController');
const { sanitizeString, sanitizeObject } = require('../middleware/validation');
const { signToken, verifyToken } = require('../utils/tokenService');

test('hashPassword produces salted PBKDF2 hash and verifies correctly', () => {
  const password = 'mySecurePassword123';
  const hashed = hashPassword(password);
  assert.ok(hashed.includes(':'), 'Hash must contain salt separator');
  assert.equal(verifyPassword(password, hashed), true, 'Correct password must verify');
  assert.equal(verifyPassword('wrongPassword', hashed), false, 'Wrong password must be rejected');
});

test('sanitizeString strips malicious script tags, raw angle brackets, and dangerous protocols', () => {
  const dirty = '<script>alert("hack")</script>Hello <img src="x" onerror="alert(1)"> World javascript:alert(2)';
  const clean = sanitizeString(dirty);
  assert.equal(clean.includes('<script>'), false);
  assert.equal(clean.includes('<'), false);
  assert.equal(clean.includes('>'), false);
  assert.equal(clean.includes('javascript:'), false);
  assert.equal(clean.includes('alert(2)'), true);
});

test('sanitizeObject blocks prototype pollution keys (__proto__, constructor, prototype)', () => {
  const dirtyJson = '{"__proto__": {"admin": true}, "constructor": {"polluted": true}, "name": "Nikhil"}';
  const parsed = JSON.parse(dirtyJson);
  const clean = sanitizeObject(parsed);

  assert.equal(clean.name, 'Nikhil');
  assert.equal(Object.prototype.admin, undefined, 'Prototype must not be polluted');
  assert.equal(clean.__proto__.admin, undefined);
  assert.equal(clean.constructor.polluted, undefined);
});

test('sanitizeObject recursively sanitizes nested objects and arrays', () => {
  const payload = {
    customer: {
      name: '<b>Nikhil</b>',
      email: '  test@example.com  ',
    },
    items: ['<script>evil()</script>safeItem', 'regular'],
  };
  const clean = sanitizeObject(payload);
  assert.equal(clean.customer.name, 'bNikhil/b');
  assert.equal(clean.customer.email, 'test@example.com');
  assert.equal(clean.items[0], 'safeItem');
  assert.equal(clean.items[1], 'regular');
});

test('signToken generates valid HMAC-SHA256 token and verifyToken decodes payload', () => {
  const payload = { sub: 'user-1', username: 'nikhil', email: 'nikhil.jasti@example.com' };
  const token = signToken(payload, 60 * 1000); // 1 minute expiry

  assert.ok(token.split('.').length === 3, 'Token must have header.payload.signature format');
  const decoded = verifyToken(token);
  assert.equal(decoded.sub, 'user-1');
  assert.equal(decoded.username, 'nikhil');
  assert.ok(decoded.exp > Date.now());
});

test('verifyToken rejects tampered or expired tokens', () => {
  const payload = { sub: 'user-1', username: 'nikhil' };
  const token = signToken(payload, -1000); // Already expired

  assert.throws(() => verifyToken(token), /TOKEN_EXPIRED/);

  const validToken = signToken(payload, 60 * 1000);
  const tamperedToken = validToken.slice(0, -4) + 'abcd';
  assert.throws(() => verifyToken(tamperedToken), /INVALID_SIGNATURE/);
});
