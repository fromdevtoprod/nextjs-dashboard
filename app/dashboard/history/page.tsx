import { CustomerHistory } from './customer-history';
import { fetchAllCustomers } from '@/app/lib/data/customers';
import { SelectCustomer } from './select-customer';

export default async function CustomerHistoryPage({
  searchParams,
}: {
  searchParams: { customerId?: string };
}) {
  const customers = await fetchAllCustomers();
  const { customerId } = searchParams;
  const selectedCustomer = customers.find(
    (customer) => customer.id === customerId,
  );
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <h1 className="mb-8 text-3xl font-bold text-[#2C3E50]">
        Customer Appointment History
      </h1>

      <SelectCustomer
        customers={customers}
        paramCustomerId={customerId || ''}
      />

      <CustomerHistory selectedCustomer={selectedCustomer} />
    </main>
  );
}
