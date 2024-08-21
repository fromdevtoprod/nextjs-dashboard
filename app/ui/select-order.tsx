import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Order } from '@/app/lib/definitions';

export type OrderOption = Order & { description: string };

export default function SelectOrder({
  orders,
  errors,
  selectedOrder,
  onOrderSelect,
}: {
  orders: OrderOption[];
  errors: string[];
  selectedOrder: string;
  onOrderSelect: (orderId: string) => void;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="product-id" className="mb-2 block text-sm font-medium">
        Select an order
      </label>
      <div className="relative">
        <select
          id="product-id"
          name="product-id"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={(e) => onOrderSelect(e.target.value)}
          defaultValue={selectedOrder}
        >
          <option value="" disabled>
            Select an order
          </option>
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.description}
            </option>
          ))}
        </select>
        <ShoppingCartIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
