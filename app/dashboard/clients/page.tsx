import { fetchAllCustomers } from '@/app/lib/data/customers';
import { ClientsContainer } from './clients-container';

export default async function ClientsPage() {
  const customers = await fetchAllCustomers();
  return <ClientsContainer initialClients={customers} />;
}
