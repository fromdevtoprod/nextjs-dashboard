import { Payment } from '@/src/entities/models/payment';
import { PaymentsRepository } from '@/src/infrastructure/repositories/payments.repository';
import { CreatePaymentPayload } from '../../repositories/payments.repository.interface';

export async function createPaymentUseCase(
  payload: CreatePaymentPayload,
  userId: string,
): Promise<Payment> {
  return new PaymentsRepository().create(payload, userId);
}
