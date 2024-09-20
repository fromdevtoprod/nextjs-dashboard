import {
  AppointmentEntity,
  SelectedAppointment,
  UpdatedAppointment,
} from '@/src/entities/models/appointment';

export type CreateAppointmentPayload = {
  careId: string;
  date: string;
  endDate: string;
  orderId: string;
};

export type UpdateAppointmentPayload = {
  id: string;
} & CreateAppointmentPayload;

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
  countAppointmentsByCareId(
    payload: CountAppointmentsByCareIdPayload,
  ): Promise<number>;
  createAppointment(
    payload: CreateAppointmentPayload,
  ): Promise<AppointmentEntity>;
  deleteAppointment(id: string): Promise<void>;
  findAll(): Promise<SelectedAppointment[]>;
  findAllAppointmentsByCustomerId(
    customerId: string,
  ): Promise<SelectedAppointment[]>;
  findAllAppointmentsByDate(
    payload: FindAllAppointmentsByDatePayload,
  ): Promise<SelectedAppointment[]>;
  findAppointmentById(id: string): Promise<SelectedAppointment>;
  findAppointmentsByOrderId(orderId: string): Promise<AppointmentEntity[]>;
  updateAppointment(
    payload: UpdateAppointmentPayload,
  ): Promise<UpdatedAppointment>;
}
