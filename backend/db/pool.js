const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  // eslint-disable-next-line no-console
  console.warn('[db] DATABASE_URL is not set. Set it in backend/.env (see .env.example).');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSL === 'false' ? false : { rejectUnauthorized: false },
  // Serverless-friendly settings (Vercel functions are short-lived, so keep the pool
  // small and let idle connections close quickly instead of holding them open).
  max: process.env.VERCEL ? 1 : 10,
  idleTimeoutMillis: 10_000,
});

pool.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('[db] Unexpected error on idle client', err);
});

module.exports = pool;
