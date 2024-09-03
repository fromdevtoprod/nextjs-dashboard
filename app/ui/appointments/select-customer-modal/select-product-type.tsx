import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export function SelectProductType({
  onProductTypeSelect,
}: {
  onProductTypeSelect: (productType: 'care' | 'cure') => void;
}) {
  return (
    <div className="mt-2">
      <div className="mb-4 mt-4">
        <div className="relative">
          <select
            id="product-type"
            name="product-type"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            onChange={(e) =>
              onProductTypeSelect(e.target.value as 'care' | 'cure')
            }
            defaultValue=""
          >
            <option value="" disabled>
              Select a product type
            </option>
            <option value="care">Care</option>
            <option value="cure">Cure</option>
          </select>
          <Cog6ToothIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>
    </div>
  );
}
