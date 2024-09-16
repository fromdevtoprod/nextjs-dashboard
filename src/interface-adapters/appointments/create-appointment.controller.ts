import { createAppointmentUseCase } from '@/src/application/use-cases/appointments/create-appointment.use-case';
import { CreatedAppointment } from '@/src/entities/models/appointment';
import { parseAppointmentForm } from './helpers';

export async function createAppointmentController(
  input: any,
): Promise<CreatedAppointment> {
  const data = parseAppointmentForm(input);
  return createAppointmentUseCase(data);
}
