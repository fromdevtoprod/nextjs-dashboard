import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';

export function findAllAppointmentTypesUseCase(): Promise<
  SelectedAppointmentType[]
> {
  return new AppointmentTypesRepository().findAll();
}
