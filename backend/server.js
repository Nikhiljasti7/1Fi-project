require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db/pool');
const { checkPostgres } = require('./db/dbService');
const productsRouter = require('./routes/products');
const wealthRouter = require('./routes/wealth');
const authRouter = require('./routes/auth');
const securityHeaders = require('./middleware/securityHeaders');
const { sanitizeInputMiddleware } = require('./middleware/validation');
const { globalLimiter, orderLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 4000;

// Respect reverse proxy (e.g. Vercel, Nginx) for accurate IP resolution without blind trust
app.set('trust proxy', 1);

// Defense-in-depth middleware pipeline
app.use(securityHeaders);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Retry-After'],
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(sanitizeInputMiddleware);

// Global anti-DDoS rate limiting on all API routes
app.use('/api', globalLimiter);

// Root welcome & API overview endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    name: '1Fi Wealth-Backed EMI Backend API',
    version: '1.0.0',
    status: 'online',
    documentation: 'https://github.com/Nikhiljasti7/1Fi-project#api-endpoints--example-responses',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      productDetail: '/api/products/:slug (e.g. /api/products/iphone-17-pro-max)',
      collateral: '/api/wealth/collateral',
      wealthCalculator: 'POST /api/wealth/calculate-offset',
      orders: '/api/orders',
      auth: {
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        forgotPassword: 'POST /api/auth/forgot-password',
        resetPassword: 'POST /api/auth/reset-password',
      },
    },
  });
});

app.get('/api/health', async (req, res) => {
  try {
    const isPg = await checkPostgres();
    if (isPg) {
      await pool.query('SELECT 1');
      return res.json({ success: true, status: 'ok', db: 'connected_postgres' });
    }
    return res.json({
      success: true,
      status: 'ok',
      db: 'embedded_resilient',
      message: 'Running in resilient standalone mode with pre-seeded expanded brand catalog and wealth engine.',
    });
  } catch (err) {
    res.json({
      success: true,
      status: 'ok',
      db: 'embedded_resilient',
      note: 'Postgres unreachable, seamlessly serving via embedded store.',
    });
  }
});

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/wealth', wealthRouter);
// Direct alias for orders with rate limiting protection
app.use('/api/orders', orderLimiter, wealthRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('[error]', err.message || err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: status === 500 && process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred. Please try again later.'
        : err.message || 'Something went wrong',
    },
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[server] 1Fi Wealth-Backed EMI server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
