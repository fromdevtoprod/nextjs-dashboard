import { z } from 'zod';

export const createProductSchema = z.object({
  amount: z.number(),
  id: z.string(),
  name: z.string(),
});

export type Product = z.infer<typeof createProductSchema>;
