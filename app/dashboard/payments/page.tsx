import { fetchAllPayments } from '@/app/lib/data/payments';
import { auth } from '@/auth';
import { PaymentsContainer } from './payments-container';

export default async function PaymentPage() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  const allPayments = await fetchAllPayments(session.user.email);
  return <PaymentsContainer initialPayments={allPayments} />;
}
