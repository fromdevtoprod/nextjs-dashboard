import { HandRaisedIcon } from '@heroicons/react/24/outline';
import { Care } from '@/app/lib/definitions';

export default function SelectCare({
  cares,
  errors,
  onCareSelect,
}: {
  cares: Care[];
  errors: string[];
  onCareSelect: (productId: string) => void;
}) {
  const handleCareSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCareSelect(e.target.value as string);
  };
  return (
    <div className="mb-4">
      <label htmlFor="care" className="mb-2 block text-sm font-medium">
        Select a care
      </label>
      <div className="relative">
        <select
          id="care"
          name="care"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={handleCareSelect}
        >
          <option value="">Select a care</option>
          {cares.map((care) => (
            <option key={care.product_id} value={care.product_id}>
              {care.product_name}
            </option>
          ))}
        </select>
        <HandRaisedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>

      <div id="care-error" aria-live="polite" aria-atomic="true">
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
