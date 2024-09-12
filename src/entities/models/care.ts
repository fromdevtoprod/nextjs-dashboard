import { z } from 'zod';
import { Product } from './product';

export const createCareSchema = z.object({
  category_id: z.string(),
  duration: z.number(),
});

export type CreatedCare = z.infer<typeof createCareSchema>;
export type Care = CreatedCare & Product;
