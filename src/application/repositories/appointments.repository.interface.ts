import {
  SelectedAppointment,
  UpcomingAppointment,
} from '@/src/entities/models/appointment';

export type CreateAppointmentPayload = {
  appointment_type_id: string;
  customer_id: string;
  date: string;
};

export type FindAllAppointmentsByDatePayload = {
  day: number;
  month: number;
  year: number;
};

export type CountAppointmentsByCareIdPayload = {
  careId: string;
  orderId: string;
};

export interface IAppointmentsRepository {
  createAppointment(
    payload: CreateAppointmentPayload,
  ): Promise<UpcomingAppointment>;
  deleteAppointment(id: string): Promise<void>;
  findAllAppointments(): Promise<SelectedAppointment[]>;
  findAllAppointmentsByDate(
    payload: FindAllAppointmentsByDatePayload,
  ): Promise<UpcomingAppointment[]>;
  findAllUpcomingAppointments(): Promise<UpcomingAppointment[]>;
  findAppointmentById(id: string): Promise<SelectedAppointment>;
}
