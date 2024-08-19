import { HandRaisedIcon } from '@heroicons/react/24/outline';
import { Care, Cure } from '@/app/lib/definitions';

export default function SelectProduct({
  cares,
  cures,
  errors,
}: {
  cares: Care[];
  cures: Cure[];
  errors: string[];
}) {
  return (
    <div className="mb-4">
      <label htmlFor="customer" className="mb-2 block text-sm font-medium">
        Select a product
      </label>
      <div className="relative">
        <select
          id="customer"
          name="customer"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        >
          <option disabled={true}>-- Cares --</option>
          {cares.map((care) => (
            <option key={care.id} value={care.id}>
              {care.name}
            </option>
          ))}
          <option disabled={true}>-- Cures --</option>
          {cures.map((cure) => (
            <option key={cure.id} value={cure.id}>
              {cure.name}
            </option>
          ))}
        </select>
        <HandRaisedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
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
