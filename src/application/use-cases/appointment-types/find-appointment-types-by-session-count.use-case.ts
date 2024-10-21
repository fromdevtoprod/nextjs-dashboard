import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function findAppointmentTypesBySessionCountUseCase(
  userEmail: string,
) {
  const userId = await getUserIdUseCase(userEmail);
  return new AppointmentTypesRepository().findBySessionCountMin(2, userId);
}
