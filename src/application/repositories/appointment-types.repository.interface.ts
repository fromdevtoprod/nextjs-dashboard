import {
  CreatedAppointmentType,
  SelectedAppointmentType,
} from '@/src/entities/models/appointment-types';

export interface IAppointmentTypesRepository {
  create(payload: CreatedAppointmentType): Promise<SelectedAppointmentType>;
  delete(id: string): Promise<void>;
  findAll(): Promise<SelectedAppointmentType[]>;
  findBySessionCountMin(
    sessionCountMin: number,
  ): Promise<SelectedAppointmentType[]>;
  update(payload: SelectedAppointmentType): Promise<SelectedAppointmentType>;
}
