export class AppError extends Error { constructor(status, message, code) { super(message); this.status = status; this.code = code; } }
export function errorHandler(err, _req, res, _next) {
  console.error(err);
  const databaseConnectionErrors = new Set(['ECONNREFUSED','ECONNRESET','ETIMEDOUT','ENOTFOUND']);
  if (databaseConnectionErrors.has(err.code)) {
    return res.status(503).json({ error: { message: 'The database is unavailable. Start PostgreSQL and check DATABASE_URL in your server .env file.', code: 'DATABASE_UNAVAILABLE' } });
  }
  if (err.code === '42P01') {
    return res.status(503).json({ error: { message: 'The database schema is missing. Run npm run db:migrate from the project root.', code: 'DATABASE_NOT_MIGRATED' } });
  }
  if (err.code === '3D000') {
    return res.status(503).json({ error: { message: 'The configured PostgreSQL database does not exist. Create it and check DATABASE_URL.', code: 'DATABASE_NOT_FOUND' } });
  }
  if (err.code === '28P01') {
    return res.status(503).json({ error: { message: 'PostgreSQL rejected the credentials in DATABASE_URL. Check your server .env file.', code: 'DATABASE_AUTH_FAILED' } });
  }
  const status = err.status || 500;
  res.status(status).json({ error: { message: status === 500 ? 'An unexpected error occurred.' : err.message, code: err.code || 'INTERNAL_ERROR' } });
}
