import { z } from "zod";

export const findPhraseSchema = 
  z.object({
    english: z.string().optional(),
    portuguese: z.string().optional(),
    tag: z.string().optional(),
  }).transform(({ english, portuguese, tag}) => {
    return {
      english,
      portuguese,
      tag,
    };
  }
);


export type FindPhraseType = z.infer<typeof findPhraseSchema>;