import { z } from 'zod';

export const selectedOrderSchema = z.object({
  id: z.string(),
  customer_id: z.string(),
  date: z.string(),
  order_status: z.string(),
  payment_status: z.string(),
  product_id: z.string(),
  product_type: z.string(),
});

export type SelectedOrder = z.infer<typeof selectedOrderSchema>;
export type CreatedOrder = SelectedOrder;
export type UpdatedOrder = SelectedOrder;
