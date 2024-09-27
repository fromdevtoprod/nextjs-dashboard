import { deleteAppointmentUseCase } from '@/src/application/use-cases/appointments/delete-appointment.use-case';

export async function deleteAppointmentController(
  appointmentId: string,
): Promise<void> {
  return deleteAppointmentUseCase(appointmentId);
}
