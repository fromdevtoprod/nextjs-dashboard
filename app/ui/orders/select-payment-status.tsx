import { CurrencyEuroIcon } from '@heroicons/react/24/outline';

export default function SelectPaymentStatus() {
  return (
    <div className="mb-4">
      <label htmlFor="status" className="mb-2 block text-sm font-medium">
        Select a status
      </label>
      <div className="relative">
        <select
          id="status"
          name="status"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue="active"
        >
          <option value="active">Pending</option>
          <option value="inactive">Paid</option>
        </select>
        <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
}