import { z } from 'zod';

export const env = z
  .object({
    ELEVENLABS_API_KEY: z.string(),
    DEEPL_API_KEY: z.string(),
    NODE_ENV: z.string().optional(),
  })
  .parse(process.env);
