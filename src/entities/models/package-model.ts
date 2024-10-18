import { z } from 'zod';

// TODO: to remove step by step
export const selectedPackageSchema = z.object({
  appointment_type_id: z.string(),
  customer_id: z.string(),
  customer_name: z.string(),
  id: z.string(),
  name: z.string(),
  remaining_sessions: z.number(),
  start_date: z.string(),
  total_sessions: z.number(),
});

export type SelectedPackage = z.infer<typeof selectedPackageSchema>;
