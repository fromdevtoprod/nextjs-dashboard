import { PaymentsRepository } from '@/src/infrastructure/repositories/payments.repository';

export async function deletePaymentUseCase(
  appointmentId: string,
): Promise<void> {
  return new PaymentsRepository().deletePayment(appointmentId);
}
