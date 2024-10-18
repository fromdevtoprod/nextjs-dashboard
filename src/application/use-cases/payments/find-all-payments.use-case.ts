import { Payment } from '@/src/entities/models/payment';
import { PaymentsRepository } from '@/src/infrastructure/repositories/payments.repository';

export function findAllPaymentsUseCase(): Promise<Payment[]> {
  return new PaymentsRepository().findAll();
}
