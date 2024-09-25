import { findAllAppointmentTypesUseCase } from '@/src/application/use-cases/appointment-types/find-all-appointment-types.use-case';

export async function findAllAppointmentTypesController() {
  return findAllAppointmentTypesUseCase();
}
