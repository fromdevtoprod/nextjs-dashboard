import { AppointmentType } from '@/src/entities/models/appointment-types';

export type CreatedAppointmentTypePayload = {
  name: string;
  duration: number;
  price: number;
  sessionCount: number;
};

export type UpdateAppointmentTypePayload = {
  id: string;
  name: string;
  duration: number;
  price: number;
  sessionCount: number;
};

export interface IAppointmentTypesRepository {
  create(
    payload: CreatedAppointmentTypePayload,
    userId: string,
  ): Promise<AppointmentType>;
  delete(id: string): Promise<void>;
  findAll(userId: string): Promise<AppointmentType[]>;
  findById(id: string): Promise<AppointmentType | null>;
  findBySessionCountMin(
    sessionCountMin: number,
    userId: string,
  ): Promise<AppointmentType[]>;
  update(payload: UpdateAppointmentTypePayload): Promise<AppointmentType>;
}
