import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function deleteAppointmentUseCase(id: string): Promise<void> {
  return new AppointmentsRepository().deleteAppointment(id);
}
