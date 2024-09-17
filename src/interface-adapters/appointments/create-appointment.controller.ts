import { createAppointmentUseCase } from '@/src/application/use-cases/appointments/create-appointment.use-case';
import { parseAppointmentForm } from './helpers';

export async function createAppointmentController(input: any) {
  const data = parseAppointmentForm(input);
  return createAppointmentUseCase(data);
}
