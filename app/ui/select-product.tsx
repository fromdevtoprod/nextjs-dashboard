import { HandRaisedIcon } from '@heroicons/react/24/outline';
import { Care, Cure } from '@/app/lib/definitions';

export default function SelectProduct({
  cares,
  cures,
  errors,
  value,
}: {
  cares: Care[];
  cures: Cure[];
  errors: string[];
  value?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="product-id" className="mb-2 block text-sm font-medium">
        Select a product
      </label>
      <div className="relative">
        <select
          id="product-id"
          name="product-id"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={value}
        >
          <option disabled={true}>-- Cares --</option>
          {cares.map((care) => (
            <option key={care.product_id} value={care.product_id}>
              {care.product_name}
            </option>
          ))}
          <option disabled={true}>-- Cures --</option>
          {cures.map((cure) => (
            <option key={cure.product_id} value={cure.product_id}>
              {cure.product_name}
            </option>
          ))}
        </select>
        <HandRaisedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>

      <div id="product-error" aria-live="polite" aria-atomic="true">
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
