import { z } from "zod";

export const createServerSchema = z.object({
  name: z.string(),
  masp: z.string(),
})

export type CreateServerType = z.infer<typeof createServerSchema>

export const findServerSchema = z.object({
  name: z.string().optional(),
  masp: z.string().optional(),
})

export type FindServerType = z.infer<typeof findServerSchema>