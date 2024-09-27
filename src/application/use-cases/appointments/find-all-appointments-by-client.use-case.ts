import { HistoryAppointment } from '@/src/entities/models/appointment';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function findAllAppointmentsByClientUseCase(
  clientId: string,
): Promise<HistoryAppointment[]> {
  return new AppointmentsRepository().findAllAppointmentsByCustomer(clientId);
}
