import { CreateAppointmentPayload } from '@/src/application/repositories/appointments.repository.interface';
import { CreatedAppointment } from '@/src/entities/models/appointment';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function createAppointmentUseCase(
  payload: CreateAppointmentPayload,
): Promise<CreatedAppointment> {
  return new AppointmentsRepository().createAppointment(payload);
}
