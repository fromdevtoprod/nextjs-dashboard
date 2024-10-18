import { FindAllAppointmentsByDatePayload } from '@/src/application/repositories/appointments.repository.interface';
import { Appointment } from '@/src/entities/models/appointment';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function findAllAppointmentsByDateUseCase(
  payload: FindAllAppointmentsByDatePayload,
): Promise<Appointment[]> {
  return new AppointmentsRepository().findAllAppointmentsByDate(payload);
}
