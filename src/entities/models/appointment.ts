import { z } from 'zod';
import { Customer } from './customer';
import { SelectedAppointmentType } from './appointment-types';
import { SelectedPayment } from './payment';

export type Appointment = {
  appointmentType: SelectedAppointmentType;
  appointmentTypeId: string;
  customer: Customer;
  customerId: string;
  date: Date;
  id: string;
  packageId: string | null;
  payments: SelectedPayment[];
};

// TODO: to remove step by step
export const selectedAppointmentSchema = z.object({
  appointment_type_id: z.string(),
  customer_id: z.string(),
  date: z.string(),
  id: z.string(),
  package_id: z.string(),
});

// TODO: to remove step by step
export const upcomingAppointmentSchema = z.object({
  client_name: z.string(),
  appointment_type_name: z.string(),
  appointment_type_price: z.string(),
  date: z.string(),
  id: z.string(),
  payment_status: z.string(),
  session_count: z.number(),
  time: z.string(),
});

// TODO: to remove step by step
export const historyAppointmentSchema = z.object({
  date: z.string(),
  id: z.string(),
  notes: z.string(),
  type: z.string(),
});

export type SelectedAppointment = z.infer<typeof selectedAppointmentSchema>;
export type UpcomingAppointment = z.infer<typeof upcomingAppointmentSchema>;
export type HistoryAppointment = z.infer<typeof historyAppointmentSchema>;
