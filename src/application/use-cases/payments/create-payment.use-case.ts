import { PaymentsRepository } from '@/src/infrastructure/repositories/payments.repository';
import { CreatePaymentPayload } from '../../repositories/payments.repository.interface';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function createPaymentUseCase(
  payload: CreatePaymentPayload,
  userEmail: string,
) {
  const userId = await getUserIdUseCase(userEmail);
  return new PaymentsRepository().create(payload, userId);
}
