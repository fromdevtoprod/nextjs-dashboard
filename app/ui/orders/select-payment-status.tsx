import { CurrencyEuroIcon } from '@heroicons/react/24/outline';

export default function SelectPaymentStatus({ errors }: { errors: string[] }) {
  return (
    <div className="mb-4">
      <label
        htmlFor="payment-status"
        className="mb-2 block text-sm font-medium"
      >
        Select a status
      </label>
      <div className="relative">
        <select
          id="payment-status"
          name="payment-status"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue="pending"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>

      <div id="payment-status-error" aria-live="polite" aria-atomic="true">
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
