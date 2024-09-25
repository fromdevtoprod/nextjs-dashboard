import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';

export function findAllAppointmentTypesUseCase() {
  return new AppointmentTypesRepository().findAll();
}
