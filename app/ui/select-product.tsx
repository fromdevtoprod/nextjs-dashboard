import { ListBulletIcon } from '@heroicons/react/24/outline';
import { SelectedCare } from '@/src/entities/models/care';
import { SelectedCure } from '@/src/entities/models/cure';
import { MyHandRaisedIcon } from './icons/hand';

export function SelectProduct({
  errors,
  productType,
  products,
  value,
  onProductSelect,
}: {
  errors: string[];
  productType: string;
  products: SelectedCare[] | SelectedCure[];
  value?: string;
  onProductSelect?: (productId: string) => void;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="product_id" className="mb-2 block text-sm font-medium">
        Select a {productType}
      </label>
      <div className="relative">
        <select
          id="product_id"
          name="product_id"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={(e) => onProductSelect && onProductSelect(e.target.value)}
          defaultValue={value || ''}
        >
          <option value="" disabled>
            Select a product
          </option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        {productType === 'care' ? (
          <MyHandRaisedIcon additionalClassName="absolute left-3 top-1/2 -translate-y-1/2" />
        ) : (
          <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        )}
      </div>

      <div id="product_id_error" aria-live="polite" aria-atomic="true">
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
