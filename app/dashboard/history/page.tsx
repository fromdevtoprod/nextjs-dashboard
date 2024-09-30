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
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
          Customer Appointment History
        </h1>
      </div>

      <SelectCustomer
        customers={customers}
        paramCustomerId={customerId || ''}
      />

      <CustomerHistory selectedCustomer={selectedCustomer} />
    </main>
  );
}
