import { z } from 'zod';

// TODO: to remove step by step
export const selectedNotesSchema = z.object({
  appointment_id: z.string(),
  content: z.string(),
});

export type SelectedNotes = z.infer<typeof selectedNotesSchema>;
