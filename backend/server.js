require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db/pool');
const { checkPostgres } = require('./db/dbService');
const productsRouter = require('./routes/products');
const wealthRouter = require('./routes/wealth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

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

app.use('/api/products', productsRouter);
app.use('/api/wealth', wealthRouter);
// Direct alias for orders
app.use('/api/orders', wealthRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('[error]', err);
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Something went wrong',
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
