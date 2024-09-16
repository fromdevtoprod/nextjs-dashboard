import {
  CreatedAppointment,
  SelectedAppointment,
  UpdatedAppointment,
} from '@/src/entities/models/appointment';

export type CreateAppointmentPayload = {};

export type UpdateAppointmentPayload = {
  id: string;
} & CreateAppointmentPayload;

export type FindAppointmentsByDatePayload = {
  day: number;
  month: number;
  year: number;
};

export interface IAppointmentsRepository {
  createAppointment(
    payload: CreateAppointmentPayload,
  ): Promise<CreatedAppointment>;
  deleteAppointment(id: string): Promise<void>;
  findAll(): Promise<SelectedAppointment[]>;
  findAppointmentsByDate(
    payload: FindAppointmentsByDatePayload,
  ): Promise<SelectedAppointment[]>;
  findAppointmentById(id: string): Promise<SelectedAppointment>;
  updateAppointment(
    payload: UpdateAppointmentPayload,
  ): Promise<UpdatedAppointment>;
}
