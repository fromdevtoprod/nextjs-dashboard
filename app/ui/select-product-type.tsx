import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { ProductType } from '@/app/lib/definitions';

export default function SelectProductType({
  errors,
  value,
  onProductTypeSelect,
}: {
  errors: string[];
  value?: string;
  onProductTypeSelect: (productType: ProductType) => void;
}) {
  return (
    <div className="mb-4">
      {/* <label htmlFor="product_type" className="mb-2 block text-sm font-medium">
        Select a product type
      </label> */}
      <div className="relative">
        <select
          id="product_type"
          name="product_type"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={(e) => onProductTypeSelect(e.target.value as ProductType)}
          defaultValue={value || ''}
        >
          <option value="" disabled>
            Select a product type
          </option>
          <option value="care">Care</option>
          <option value="cure">Cure</option>
        </select>
        <Cog6ToothIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>

      <div id="product_type_error" aria-live="polite" aria-atomic="true">
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
