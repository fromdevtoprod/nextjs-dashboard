import { findAppointmentTypesBySessionCountUseCase } from '@/src/application/use-cases/appointment-types/find-appointment-types-by-session-count.use-case';

export async function findAppointmentTypesBySessionCountController() {
  return findAppointmentTypesBySessionCountUseCase();
}
