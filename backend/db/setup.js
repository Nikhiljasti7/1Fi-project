/**
 * Applies database/schema.sql then database/seed.sql against DATABASE_URL.
 * Usage: npm run db:setup   (from backend/)
 */
const fs = require('fs');
const path = require('path');
const pool = require('./pool');

async function run() {
  const schemaPath = path.join(__dirname, '..', '..', 'database', 'schema.sql');
  const seedPath = path.join(__dirname, '..', '..', 'database', 'seed.sql');

  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  const seedSql = fs.readFileSync(seedPath, 'utf8');

  const client = await pool.connect();
  try {
    console.log('[db:setup] Applying schema.sql ...');
    await client.query(schemaSql);
    console.log('[db:setup] Applying seed.sql ...');
    await client.query(seedSql);
    console.log('[db:setup] Done. Database is ready.');
  } catch (err) {
    console.error('[db:setup] Failed:', err.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

run();
