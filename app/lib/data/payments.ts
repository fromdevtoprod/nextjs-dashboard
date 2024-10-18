import { findAllPaymentsUseCase } from '@/src/application/use-cases/payments/find-all-payments.use-case';
import { Payment } from '@/src/entities/models/payment';

export async function fetchAllPayments(): Promise<Payment[]> {
  try {
    const allPayments = await findAllPaymentsUseCase();
    return allPayments;
  } catch (err) {
    console.error('fetchAllPayments >> findAllPaymentsUseCase :', err);
    return [];
  }
}
