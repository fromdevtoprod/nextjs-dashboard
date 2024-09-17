import { CountAppointmentsByCareIdPayload } from '@/src/application/repositories/appointments.repository.interface';
import { countAppointmentsByCareIdUseCase } from '@/src/application/use-cases/appointments/count-appointment.use-case';

export async function countAppointmentsByCareIdController(
  payload: CountAppointmentsByCareIdPayload,
): Promise<number> {
  return countAppointmentsByCareIdUseCase(payload);
}
