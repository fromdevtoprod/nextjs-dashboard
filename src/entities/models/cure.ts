import { z } from 'zod';

export const selectedCureSchema = z.object({
  id: z.string(),
  amount: z.number(),
  care_1_id: z.string(),
  care_1_session_number: z.number(),
  care_2_id: z.string().nullable(),
  care_2_session_number: z.number(),
  name: z.string(),
});

export const createdCureSchema = z.object({
  id: z.string(),
  amount: z.number(),
  care_1_id: z.string(),
  care_1_session_number: z.number(),
  care_2_id: z.string().nullable(),
  care_2_session_number: z.number(),
  name: z.string(),
});

export type SelectedCure = z.infer<typeof selectedCureSchema>;
export type CreatedCure = z.infer<typeof createdCureSchema>;
