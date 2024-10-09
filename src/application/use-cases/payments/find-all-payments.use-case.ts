import { SelectedPayment } from '@/src/entities/models/payment';
import { PaymentsRepository } from '@/src/infrastructure/repositories/payments.repository';

export function findAllPaymentsUseCase(): Promise<SelectedPayment[]> {
  return new PaymentsRepository().findAll();
}
