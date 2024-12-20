import { Appointment } from '@/src/entities/models/appointment';

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
  countLastYearAppointments(userId: string): Promise<number>;
  countAllUpcomingAppointments(userId: string): Promise<number>;
  createAppointment(
    payload: CreateAppointmentPayload,
    userId: string,
  ): Promise<Appointment | null>;
  deleteAppointment(id: string): Promise<void>;
  deleteByAppointmentTypeId(appointmentTypeId: string): Promise<void>;
  deleteByCustomerId(customerId: string): Promise<void>;
  findAllAppointments(): Promise<Appointment[]>;
  findAllAppointmentsByCustomer(customerId: string): Promise<Appointment[]>;
  findAllAppointmentsByDate(
    payload: FindAllAppointmentsByDatePayload,
    userId: string,
  ): Promise<Appointment[]>;
  findAppointmentById(id: string): Promise<Appointment | null>;
}
