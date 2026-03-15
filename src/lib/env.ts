import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(4000),
    CLIENT_ORIGIN: z.url().default('http://localhost:3000'),
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string(),
  },

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
