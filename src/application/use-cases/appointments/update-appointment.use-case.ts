import { UpdateAppointmentPayload } from '@/src/application/repositories/appointments.repository.interface';
import { CreatedAppointment } from '@/src/entities/models/appointment';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function updateAppointmentUseCase(
  payload: UpdateAppointmentPayload,
): Promise<CreatedAppointment> {
  return new AppointmentsRepository().updateAppointment(payload);
}
