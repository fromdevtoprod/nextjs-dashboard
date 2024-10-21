import { FindAllAppointmentsByDatePayload } from '@/src/application/repositories/appointments.repository.interface';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function findAllAppointmentsByDateUseCase(
  payload: FindAllAppointmentsByDatePayload,
  userEmail: string,
) {
  const userId = await getUserIdUseCase(userEmail);
  if (!userId) {
    throw new Error('User not found');
  }

  return new AppointmentsRepository().findAllAppointmentsByDate(
    payload,
    userId,
  );
}
