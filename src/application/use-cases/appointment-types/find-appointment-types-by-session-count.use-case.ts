import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';

export function findAppointmentTypesBySessionCountUseCase() {
  return new AppointmentTypesRepository().findBySessionCountMin(2);
}
