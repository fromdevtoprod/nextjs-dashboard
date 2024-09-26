import { z } from 'zod';

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

export const createdPackageSchema = selectedPackageSchema.omit({
  customer_name: true,
  id: true,
  name: true,
  total_sessions: true,
});

export type SelectedPackage = z.infer<typeof selectedPackageSchema>;

export type CreatedPackage = z.infer<typeof createdPackageSchema>;
