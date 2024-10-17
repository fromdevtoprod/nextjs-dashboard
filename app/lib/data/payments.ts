import { findAllPaymentsUseCase } from '@/src/application/use-cases/payments/find-all-payments.use-case';
import { SelectedPayment } from '@/src/entities/models/payment';

export async function fetchAllPayments(): Promise<SelectedPayment[]> {
  try {
    const allPayments = await findAllPaymentsUseCase();
    return allPayments;
  } catch (err) {
    console.error('fetchAllPayments >> findAllPaymentsUseCase :', err);
    return [];
  }
}
