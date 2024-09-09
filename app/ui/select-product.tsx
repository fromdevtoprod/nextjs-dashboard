import { ListBulletIcon } from '@heroicons/react/24/outline';
import { CareShortDescription, Cure, ProductType } from '@/app/lib/definitions';
import { MyHandRaisedIcon } from './icons/hand';

export function SelectProduct({
  errors,
  productType,
  products,
  value,
  onProductSelect,
}: {
  errors: string[];
  productType: ProductType;
  products: CareShortDescription[] | Cure[];
  value?: string;
  onProductSelect?: (productId: string) => void;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="product-id" className="mb-2 block text-sm font-medium">
        Select a {productType}
      </label>
      <div className="relative">
        <select
          id="product-id"
          name="product-id"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={(e) => onProductSelect && onProductSelect(e.target.value)}
          defaultValue={value || ''}
        >
          <option value="" disabled>
            Select a product
          </option>
          {products.map((product) => (
            <option key={product.product_id} value={product.product_id}>
              {product.product_name}
            </option>
          ))}
        </select>
        {productType === 'care' ? (
          <MyHandRaisedIcon additionalClassName="absolute left-3 top-1/2 -translate-y-1/2" />
        ) : (
          <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        )}
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
