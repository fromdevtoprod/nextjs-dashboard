import { z } from 'zod';

export const selectedCustomer = z.object({
  birth_date: z.string(),
  email: z.string(),
  id: z.string(),
  name: z.string(),
  pathology: z.string(),
  phone: z.string(),
});

export const createdCustomerSchema = selectedCustomer.omit({ id: true });

export type SelectedCustomer = z.infer<typeof selectedCustomer>;
export type CreatedCustomer = z.infer<typeof createdCustomerSchema>;
export type UpdatedCustomer = SelectedCustomer;
