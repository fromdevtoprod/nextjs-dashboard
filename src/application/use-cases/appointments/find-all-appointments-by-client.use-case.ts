import { Appointment } from '@/src/entities/models/appointment';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function findAllAppointmentsByClientUseCase(
  clientId: string,
): Promise<Appointment[]> {
  return new AppointmentsRepository().findAllAppointmentsByCustomer(clientId);
}
