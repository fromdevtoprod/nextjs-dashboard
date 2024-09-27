import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function deleteAppointmentUseCase(
  appointmentId: string,
): Promise<void> {
  return new AppointmentsRepository().deleteAppointment(appointmentId);
}
