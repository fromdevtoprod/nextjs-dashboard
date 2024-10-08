import {
  HistoryAppointment,
  SelectedAppointment,
  UpcomingAppointment,
} from '@/src/entities/models/appointment';

export type CreateAppointmentPayload = {
  appointment_type_id: string;
  customer_id: string;
  date: string;
  package_id?: string | null;
  payment: {
    method: string;
    status: string;
  };
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
  countLastYearAppointments(): Promise<number>;
  countAllUpcomingAppointments(): Promise<number>;
  createAppointment(
    payload: CreateAppointmentPayload,
  ): Promise<UpcomingAppointment>;
  deleteAppointment(id: string): Promise<void>;
  findAllAppointments(): Promise<SelectedAppointment[]>;
  findAllAppointmentsByCustomer(
    customerId: string,
  ): Promise<HistoryAppointment[]>;
  findAllAppointmentsByDate(
    payload: FindAllAppointmentsByDatePayload,
  ): Promise<UpcomingAppointment[]>;
  findAllUpcomingAppointments(): Promise<UpcomingAppointment[]>;
  findAppointmentById(id: string): Promise<SelectedAppointment>;
}
