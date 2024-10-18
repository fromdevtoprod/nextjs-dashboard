import { z } from 'zod';

export const customer = z.object({
  address: z.string().nullable(),
  birth_date: z.string(),
  city: z.string().nullable(),
  created_at: z.date().nullable(),
  email: z.string(),
  id: z.string(),
  name: z.string(),
  pathology: z.string().nullable(),
  phone: z.string(),
  postal_code: z.string().nullable(),
});

export type Customer = z.infer<typeof customer>;
