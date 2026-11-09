export class AppError extends Error { constructor(status, message, code) { super(message); this.status = status; this.code = code; } }
export function errorHandler(err, _req, res, _next) { console.error(err); const status = err.status || 500; res.status(status).json({ error: { message: status === 500 ? 'An unexpected error occurred.' : err.message, code: err.code || 'INTERNAL_ERROR' } }); }
