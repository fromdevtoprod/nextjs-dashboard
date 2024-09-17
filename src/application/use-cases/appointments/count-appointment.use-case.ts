import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { CountAppointmentsByCareIdPayload } from '../../repositories/appointments.repository.interface';

export async function countAppointmentsByCareIdUseCase(
  payload: CountAppointmentsByCareIdPayload,
): Promise<number> {
  return new AppointmentsRepository().countAppointmentsByCareId(payload);
}
