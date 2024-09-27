import { CreateAppointmentPayload } from '@/src/application/repositories/appointments.repository.interface';
import { createAppointmentUseCase } from '@/src/application/use-cases/appointments/create-appointment.use-case';
import { UpcomingAppointment } from '@/src/entities/models/appointment';

export async function createAppointmentController(
  payload: CreateAppointmentPayload,
): Promise<UpcomingAppointment> {
  return createAppointmentUseCase(payload);
}
