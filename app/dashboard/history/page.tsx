import { fetchAllCustomers } from '@/app/lib/data/customers';
import { CustomerHistory } from './customer-history';
import { SelectCustomer } from './select-customer';
import { HistoryHeader } from './history-header';
import { auth } from '@/auth';

export default async function CustomerHistoryPage({
  searchParams,
}: {
  searchParams: { customerId?: string };
}) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  const customers = await fetchAllCustomers(session.user.email);
  const { customerId } = searchParams;
  const selectedCustomer = customers.find(
    (customer) => customer.id === customerId,
  );
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <HistoryHeader />
      </div>

      <SelectCustomer
        customers={customers}
        paramCustomerId={customerId || ''}
      />

      <CustomerHistory selectedCustomer={selectedCustomer} />
    </main>
  );
}
