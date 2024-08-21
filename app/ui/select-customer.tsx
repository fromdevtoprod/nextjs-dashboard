import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { CustomerField } from '@/app/lib/definitions';

export default function SelectCustomer({
  customers,
  errors,
  selectedCustomer,
  onCustomerSelect,
}: {
  customers: CustomerField[];
  errors: string[];
  selectedCustomer: string;
  onCustomerSelect: (customer: string) => void;
}) {
  const [customerName, setCustomerName] = useState<string>('');
  const handleCustomerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const customer_id = e.target.value;
    const customer = customers.find((customer) => customer.id === customer_id);
    if (customer) {
      setCustomerName(customer.name);
    }
    onCustomerSelect(customer_id);
  };
  return (
    <div className="mb-4">
      <label htmlFor="customer" className="mb-2 block text-sm font-medium">
        Select a customer
      </label>
      <div className="relative">
        <select
          id="customer"
          name="customer"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={selectedCustomer}
          onChange={handleCustomerSelect}
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

      <input type="hidden" name="customer-name" value={customerName} />

      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {errors &&
          errors.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  );
}
