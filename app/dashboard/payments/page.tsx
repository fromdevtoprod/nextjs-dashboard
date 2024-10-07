import { fetchAllPayments } from '@/app/lib/data/payments';
import { PaymentsContainer } from './payments-container';

export default async function PaymentPage() {
  const allPayments = await fetchAllPayments();
  return <PaymentsContainer initialPayments={allPayments} />;
}
