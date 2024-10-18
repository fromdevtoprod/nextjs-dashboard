import { AppointmentType } from '@/src/entities/models/appointment-types';
import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';

export function findAppointmentTypesBySessionCountUseCase(): Promise<
  AppointmentType[]
> {
  return new AppointmentTypesRepository().findBySessionCountMin(2);
}
