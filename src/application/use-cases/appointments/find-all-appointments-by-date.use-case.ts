import { FindAllAppointmentsByDatePayload } from '@/src/application/repositories/appointments.repository.interface';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export function findAllAppointmentsByDateUseCase(
  payload: FindAllAppointmentsByDatePayload,
) {
  return new AppointmentsRepository().findAllAppointmentsByDate(payload);
}
