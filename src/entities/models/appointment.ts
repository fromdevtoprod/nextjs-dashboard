import { z } from 'zod';

export const selectedAppointmentSchema = z.object({
  id: z.string(),
  care_name: z.string(),
  customer_id: z.string(),
  customer_name: z.string(),
  date: z.string(),
  end_date: z.string(),
  payment_status: z.string(),
  order_id: z.string(),
});

export type SelectedAppointment = z.infer<typeof selectedAppointmentSchema>;
export type CreatedAppointment = SelectedAppointment;
export type UpdatedAppointment = SelectedAppointment;
