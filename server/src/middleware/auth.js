import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors.js';
export function requireAuth(req, _res, next) { const header = req.headers.authorization || ''; const token = header.startsWith('Bearer ') ? header.slice(7) : ''; try { if (!token) throw new Error(); req.user = jwt.verify(token, process.env.JWT_SECRET); next(); } catch { next(new AppError(401, 'Authentication required.', 'UNAUTHORIZED')); } }
