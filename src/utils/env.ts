import { z } from 'zod';

export const env = z
  .object({
    ELEVENLABS_API_KEY: z.string(),
    DEEPL_API_KEY: z.string(),
  })
  .parse(process.env);
