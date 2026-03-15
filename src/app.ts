import 'dotenv/config';
import express, { Request, Response } from 'express';
import type { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from '@apollo/server';

import { expressMiddleware } from '@as-integrations/express5';
import { statusCode } from '@utils/statusCodes.js';
import { prisma } from '@lib/prisma.js';
import schema from '@graphql/schema.js';
import createContext from '@graphql/context.js';
import { authMiddleware } from '@middleware/index.js';
import { env } from '@utils/env.js';

const app: Application = express();

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

/* ---------- Apollo Server ---------- */

const apolloServer = new ApolloServer({
  schema,
});

await apolloServer.start();

// attach authentication to populate `req.user` before GraphQL context is created
app.use(authMiddleware);

app.use(
  '/graphql',
  expressMiddleware(apolloServer, {
    context: async ({ req, res }) => createContext({ req, res }),
  })
);

/* ---------- REST Routes ---------- */

app.get('/', (_req: Request, res: Response) => {
  res.send('👋 Welcome from Job board api');
});

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(statusCode.success).json({
      status: 'ok',
      db: 'connected',
      uptime: process.uptime(),
    });
  } catch {
    res.status(statusCode.serviceUnavailable).json({
      status: 'degraded',
      db: 'disconnected',
    });
  }
});

export default app;
