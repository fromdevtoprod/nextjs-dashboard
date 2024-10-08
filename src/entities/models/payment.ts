import { z } from 'zod';

export const selectedPayment = z.object({
  id: z.string(),
  appointment_id: z.string().nullable(),
  amount: z.number(),
  customer_id: z.string(),
  date: z.string(),
  method: z.string(),
  package_id: z.string().nullable(),
  status: z.string(),
});

export type SelectedPayment = z.infer<typeof selectedPayment>;
