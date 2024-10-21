import { findAllPaymentsUseCase } from '@/src/application/use-cases/payments/find-all-payments.use-case';

export async function fetchAllPayments(userEmail: string) {
  try {
    const allPayments = await findAllPaymentsUseCase(userEmail);
    return allPayments;
  } catch (err) {
    console.error('fetchAllPayments >> findAllPaymentsUseCase :', err);
    return [];
  }
}
