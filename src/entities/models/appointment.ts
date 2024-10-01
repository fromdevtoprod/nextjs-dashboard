import { z } from 'zod';

export const selectedAppointmentSchema = z.object({
  appointment_type_id: z.string(),
  customer_id: z.string(),
  date: z.string(),
  id: z.string(),
  package_id: z.string(),
});

export const upcomingAppointmentSchema = z.object({
  client_name: z.string(),
  appointment_type_name: z.string(),
  date: z.string(),
  id: z.string(),
  session_count: z.number(),
  time: z.string(),
});

export const historyAppointmentSchema = z.object({
  date: z.string(),
  id: z.string(),
  notes: z.string(),
  type: z.string(),
});

export type SelectedAppointment = z.infer<typeof selectedAppointmentSchema>;
export type UpcomingAppointment = z.infer<typeof upcomingAppointmentSchema>;
export type HistoryAppointment = z.infer<typeof historyAppointmentSchema>;
