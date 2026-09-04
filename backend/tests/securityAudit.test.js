const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../server');
const { signToken } = require('../utils/tokenService');

describe('Security Penetration & Hardening Audit', () => {
  let server;
  let baseUrl;

  before(async () => {
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  it('SECURITY: Master OTP Backdoor (849201) is permanently removed', async () => {
    const res = await fetch(`${baseUrl}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'nikhil.jasti@example.com',
        otp: '849201', // Attacker attempts backdoor
        newPassword: 'SecureNewPassword123!',
      }),
    });

    const body = await res.json();
    assert.equal(res.status, 400, 'Backdoor OTP must be rejected with 400');
    assert.equal(body.success, false);
    assert.equal(body.error.code, 'INVALID_OR_EXPIRED_OTP');
  });

  it('SECURITY: Unauthenticated GET /api/orders blocks access with 401 (BOLA defense)', async () => {
    const res = await fetch(`${baseUrl}/api/orders`);
    const body = await res.json();

    assert.equal(res.status, 401, 'Unauthenticated orders access must return 401');
    assert.equal(body.success, false);
    assert.equal(body.error.code, 'AUTH_REQUIRED');
    assert.equal(body.data, undefined, 'Private customer orders and PAN must not be leaked');
  });

  it('SECURITY: GET /api/auth/me requires valid Bearer token', async () => {
    // Without token
    const unauthRes = await fetch(`${baseUrl}/api/auth/me`);
    assert.equal(unauthRes.status, 401);

    // With valid token
    const token = signToken({
      sub: 'user-1',
      username: 'nikhil',
      email: 'nikhil.jasti@example.com',
      name: 'Nikhil Jasti',
    });

    const authRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    assert.equal(authRes.status, 200);
    const body = await authRes.json();
    assert.equal(body.success, true);
    assert.equal(body.data.username, 'nikhil');
  });

  it('SECURITY: Financial price tampering on /api/orders is blocked', async () => {
    const token = signToken({
      sub: 'user-1',
      username: 'nikhil',
      email: 'nikhil.jasti@example.com',
    });

    const res = await fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product: {
          slug: 'iphone-16-pro-max',
          name: 'iPhone 16 Pro Max',
          sellingPrice: 144900,
        },
        plan: {
          tenureMonths: 12,
          monthlyPayment: 1, // Fraudulent: ₹1/month instead of ₹12,075
          totalPayable: 12,
        },
        pledgedAsset: {
          type: 'MUTUAL_FUND',
          name: 'Parag Parikh Flexi Cap Fund',
        },
      }),
    });

    const body = await res.json();
    assert.equal(res.status, 400, 'Tampered pricing must be rejected');
    assert.equal(body.success, false);
    assert.equal(body.error.code, 'PRICE_TAMPERING_DETECTED');
  });

  it('SECURITY: IDOR / Cross-user prepay attempt on another user order is forbidden', async () => {
    // User 2 tries to prepay user-1's order
    const user2Token = signToken({
      sub: 'user-2',
      username: 'demo',
      email: 'demo@1fi.app',
    });

    const res = await fetch(`${baseUrl}/api/orders/1FI-ORD-98214/prepay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user2Token}`,
      },
    });

    const body = await res.json();
    assert.equal(res.status, 403, 'Cross-user loan prepayment must be blocked with 403');
    assert.equal(body.success, false);
    assert.equal(body.error.code, 'UNAUTHORIZED_LOAN_ACCESS');
  });

  it('SECURITY: Math DoS on calculate-offset returns 400 instead of 500 crash', async () => {
    const res = await fetch(`${baseUrl}/api/wealth/calculate-offset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenureMonths: 0,
        phonePrice: -500,
        expectedCagr: 999999,
      }),
    });

    assert.equal(res.status, 400, 'Invalid math parameters must cleanly return 400, never 500');
    const body = await res.json();
    assert.equal(body.success, false);
    assert.ok(body.error.code.startsWith('INVALID_'));
  });

  it('SECURITY: Production security headers (CSP, HSTS, X-Frame, Cache-Control) are present', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(res.headers.get('x-frame-options'), 'DENY');
    assert.ok(res.headers.get('content-security-policy'), 'CSP header must be set');
    assert.ok(res.headers.get('strict-transport-security'), 'HSTS must be set');
    assert.equal(res.headers.get('x-powered-by'), null, 'X-Powered-By must be removed');
  });
});
