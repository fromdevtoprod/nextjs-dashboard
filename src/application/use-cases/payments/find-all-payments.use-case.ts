import { PaymentsRepository } from '@/src/infrastructure/repositories/payments.repository';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function findAllPaymentsUseCase(userEmail: string) {
  const userId = await getUserIdUseCase(userEmail);
  if (!userId) {
    throw new Error('User not found');
  }
  return new PaymentsRepository().findAll(userId);
}
