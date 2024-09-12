import { z } from 'zod';

export const createCareSchema = z.object({
  amount: z.number(),
  category_id: z.string(),
  duration: z.number(),
  id: z.string(),
  name: z.string(),
});

export const selectedCareSchema = z.object({
  amount: z.number(),
  category_id: z.string(),
  category_name: z.string(),
  duration: z.number(),
  id: z.string(),
  name: z.string(),
});

export type CreatedCare = z.infer<typeof createCareSchema>;
export type SelectedCare = z.infer<typeof selectedCareSchema>;
