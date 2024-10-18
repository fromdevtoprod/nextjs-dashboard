import { z } from 'zod';

export type AppointmentType = {
  id: string;
  name: string;
  duration: number;
  price: number;
  session_count: number;
};

// TODO: to remove step by step
export const selectedAppointmentTypeSchema = z.object({
  duration: z.number(),
  id: z.string(),
  name: z.string(),
  price: z.number(),
  session_count: z.number(),
});

export const createdAppointmentTypeSchema = selectedAppointmentTypeSchema.omit({
  id: true,
});

export type SelectedAppointmentType = z.infer<
  typeof selectedAppointmentTypeSchema
>;

export type CreatedAppointmentType = z.infer<
  typeof createdAppointmentTypeSchema
>;
