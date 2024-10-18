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
  create(payload: CreatedAppointmentTypePayload): Promise<AppointmentType>;
  delete(id: string): Promise<void>;
  findAll(): Promise<AppointmentType[]>;
  findById(id: string): Promise<AppointmentType | null>;
  findBySessionCountMin(sessionCountMin: number): Promise<AppointmentType[]>;
  update(payload: UpdateAppointmentTypePayload): Promise<AppointmentType>;
}
