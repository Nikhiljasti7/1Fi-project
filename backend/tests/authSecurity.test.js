const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, verifyPassword } = require('../controllers/authController');
const { sanitizeString, sanitizeObject } = require('../middleware/validation');

test('hashPassword produces salted PBKDF2 hash and verifies correctly', () => {
  const password = 'mySecurePassword123';
  const hashed = hashPassword(password);
  assert.ok(hashed.includes(':'), 'Hash must contain salt separator');
  assert.equal(verifyPassword(password, hashed), true, 'Correct password must verify');
  assert.equal(verifyPassword('wrongPassword', hashed), false, 'Wrong password must be rejected');
});

test('sanitizeString strips malicious script tags and raw angle brackets', () => {
  const dirty = '<script>alert("hack")</script>Hello <img src="x" onerror="alert(1)"> World';
  const clean = sanitizeString(dirty);
  assert.equal(clean.includes('<script>'), false);
  assert.equal(clean.includes('<'), false);
  assert.equal(clean.includes('>'), false);
  assert.equal(clean, 'Hello img src="x" onerror="alert(1)" World');
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
