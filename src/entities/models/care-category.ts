import { z } from 'zod';

export const selectedCareCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type SelectedCareCategory = z.infer<typeof selectedCareCategorySchema>;
