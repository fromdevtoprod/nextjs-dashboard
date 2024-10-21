import { fetchAllPayments } from '@/app/lib/data/payments';
import { PaymentsContainer } from './payments-container';
import { getUserEmail } from '@/app/lib/auth-utils';

export default async function PaymentPage() {
  const userEmail = await getUserEmail();
  const allPayments = await fetchAllPayments(userEmail);
  return <PaymentsContainer initialPayments={allPayments} />;
}
