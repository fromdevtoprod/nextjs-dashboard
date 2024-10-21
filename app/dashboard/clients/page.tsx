import { fetchAllCustomers } from '@/app/lib/data/customers';
import { auth } from '@/auth';
import { ClientsContainer } from './clients-container';

export default async function ClientsPage() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }
  const customers = await fetchAllCustomers(session.user.email);
  return (
    <ClientsContainer
      initialClients={customers}
      userEmail={session.user.email}
    />
  );
}
