import { CustomerField } from '@/app/lib/definitions';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export function SelectCustomer({
  customers,
  onCustomerSelect,
}: {
  customers: CustomerField[];
  onCustomerSelect: (customerId: string) => void;
}) {
  return (
    <div className="mt-2">
      <div className="mb-4 mt-4">
        <div className="relative">
          <select
            id="customer"
            name="customer"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            onChange={(e) => onCustomerSelect(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>
    </div>
  );
}
