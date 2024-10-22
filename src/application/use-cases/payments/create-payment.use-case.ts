import { PaymentsRepository } from '@/src/infrastructure/repositories/payments.repository';
import {
  CreatePaymentPayload,
  IPaymentsRepository,
} from '../../repositories/payments.repository.interface';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function createPaymentUseCase(
  payload: CreatePaymentPayload,
  userEmail: string,
) {
  const userId = await getUserIdUseCase(userEmail);
  return new PaymentCreationUseCase(new PaymentsRepository()).create(
    payload,
    userId,
  );
}

export class PaymentCreationUseCase {
  constructor(private repository: IPaymentsRepository) {}

  public create(payload: CreatePaymentPayload, userId: string): Promise<any> {
    return this.repository.create(payload, userId);
  }
}
