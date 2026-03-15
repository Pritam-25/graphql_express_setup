import type { Request, Response } from 'express';
import { prisma } from '@lib/prisma.js';

export interface AuthUser {
  id: string;
  isAdmin: boolean;
}

export interface Context {
  prisma: typeof prisma;
  user: AuthUser | null;
  res: Response;
}

export const createContext = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<Context> => {
  return {
    prisma,
    user: (req as Request & { user?: AuthUser | null }).user ?? null,
    res,
  };
};

export default createContext;
