import { z } from 'zod';

export const selectedCustomer = z.object({
  address: z.string(),
  birth_date: z.string(),
  city: z.string(),
  created_at: z.string(),
  email: z.string(),
  id: z.string(),
  name: z.string(),
  pathology: z.string(),
  phone: z.string(),
  postal_code: z.string(),
});

export const createdCustomerSchema = selectedCustomer.omit({
  id: true,
  created_at: true,
});

export type SelectedCustomer = z.infer<typeof selectedCustomer>;
export type CreatedCustomer = z.infer<typeof createdCustomerSchema>;
export type UpdatedCustomer = SelectedCustomer;
