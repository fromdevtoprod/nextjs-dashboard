import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { NotesRepository } from '@/src/infrastructure/repositories/notes.repository';

export async function deleteAppointmentUseCase(
  appointmentId: string,
): Promise<void> {
  await new NotesRepository().delete(appointmentId);
  return new AppointmentsRepository().deleteAppointment(appointmentId);
}
