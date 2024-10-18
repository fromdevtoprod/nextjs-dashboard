import {
  Appointment,
  HistoryAppointment,
  SelectedAppointment,
  UpcomingAppointment,
} from '@/src/entities/models/appointment';

export type CreateAppointmentPayload = {
  appointment_type_id: string;
  customer_id: string;
  date: string;
  is_package: boolean;
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
  createAppointment(payload: CreateAppointmentPayload): Promise<any>;
  deleteAppointment(id: string): Promise<void>;
  deleteByAppointmentTypeId(appointmentTypeId: string): Promise<void>;
  deleteByCustomerId(customerId: string): Promise<void>;
  findAllAppointments(): Promise<SelectedAppointment[]>;
  findAllAppointmentsByCustomer(
    customerId: string,
  ): Promise<HistoryAppointment[]>;
  findAllAppointmentsByDate(
    payload: FindAllAppointmentsByDatePayload,
  ): Promise<Appointment[]>;
  findAllUpcomingAppointments(): Promise<UpcomingAppointment[]>;
  findAppointmentById(id: string): Promise<SelectedAppointment>;
}
