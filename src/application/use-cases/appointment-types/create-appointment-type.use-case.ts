import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';
import { CreatedAppointmentTypePayload } from '../../repositories/appointment-types.repository.interface';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function createAppointmentTypeUseCase(
  payload: CreatedAppointmentTypePayload,
  userEmail: string,
) {
  const userId = await getUserIdUseCase(userEmail);
  if (!userId) {
    throw new Error('User not found');
  }
  return new AppointmentTypesRepository().create(payload, userId);
}
