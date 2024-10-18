import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function deleteAllAppointmentsByClientUseCase(customerId: string) {
  return new AppointmentsRepository().deleteByCustomerId(customerId);
}
