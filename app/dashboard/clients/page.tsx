import { fetchAllCustomers } from '@/app/lib/data/customers';
import { getUserEmail } from '@/app/lib/auth-utils';
import { ClientsContainer } from './clients-container';

export default async function ClientsPage() {
  const userEmail = await getUserEmail();
  const customers = await fetchAllCustomers(userEmail);
  return <ClientsContainer initialClients={customers} userEmail={userEmail} />;
}
