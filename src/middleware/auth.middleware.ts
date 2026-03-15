import { verifyToken } from '@utils/jwt.js';
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const payload = verifyToken(token) as {
      id: string;
      isAdmin: boolean;
    } | null;
    req.user = payload
      ? { id: String(payload.id), isAdmin: Boolean(payload.isAdmin) }
      : null;
  } catch {
    req.user = null;
  }

  next();
};
