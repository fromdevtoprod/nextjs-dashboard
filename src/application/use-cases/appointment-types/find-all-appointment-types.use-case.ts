import { AppointmentType } from '@/src/entities/models/appointment-types';
import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';

export function findAllAppointmentTypesUseCase(): Promise<AppointmentType[]> {
  return new AppointmentTypesRepository().findAll();
}
