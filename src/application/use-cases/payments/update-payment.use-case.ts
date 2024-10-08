import { SelectedPayment } from '@/src/entities/models/payment';
import { PaymentsRepository } from '@/src/infrastructure/repositories/payments.repository';
import { UpdatePaymentPayload } from '../../repositories/payments.repository.interface';

export async function updatePaymentUseCase(
  payload: UpdatePaymentPayload,
): Promise<SelectedPayment> {
  return new PaymentsRepository().updatePayment(payload);
}
