import { HandRaisedIcon } from '@heroicons/react/24/outline';
import { Care, Cure } from '@/app/lib/definitions';
import { useState } from 'react';

export default function SelectProduct({
  cares,
  cures,
  errors,
  defaultProductType = 'care',
  value,
}: {
  cares: Care[];
  cures: Cure[];
  errors: string[];
  defaultProductType?: 'care' | 'cure';
  value?: string;
}) {
  const [productType, setProductType] = useState<string>(defaultProductType);
  const onProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const product_id = e.target.value;
    if (isCareId(product_id)) {
      return setProductType('care');
    }
    setProductType('cure');
  };
  const isCareId = (id: string) => cares.some((care) => care.id === id);
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
          onChange={onProductChange}
          defaultValue={value}
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

      <input type="hidden" name="product-type" value={productType} />

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
