import { z } from 'zod';

export const selectedNotesSchema = z.object({
  appointment_id: z.string(),
  content: z.string(),
});

export type SelectedNotes = z.infer<typeof selectedNotesSchema>;
