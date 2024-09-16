import { z } from 'zod';

export const selectedCustomer = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  birthDate: z.string(),
  pathology: z.string(),
});

export const createdCustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  birthDate: z.string(),
  pathology: z.string(),
});

export type SelectedCustomer = z.infer<typeof selectedCustomer>;
export type CreatedCustomer = z.infer<typeof createdCustomerSchema>;
export type UpdatedCustomer = CreatedCustomer;
