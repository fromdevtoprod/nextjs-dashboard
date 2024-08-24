import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Order } from '@/app/lib/definitions';
import { useState } from 'react';

export type OrderOption = Order & { description: string };

export default function SelectOrder({
  orders,
  errors,
  selectedOrderId,
  onOrderSelect,
}: {
  orders: OrderOption[];
  errors: string[];
  selectedOrderId: string;
  onOrderSelect: (orderId: string) => void;
}) {
  const [productName, setProductName] = useState<string>('');
  const handleOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order_id = e.target.value;
    const order = orders.find((order) => order.id === order_id);
    if (order) {
      setProductName(order.description);
    }
    onOrderSelect(order_id);
  };
  return (
    <div className="mb-4">
      <label htmlFor="order-id" className="mb-2 block text-sm font-medium">
        Select an order
      </label>
      <div className="relative">
        <select
          id="order-id"
          name="order-id"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={handleOrderSelect}
          defaultValue={selectedOrderId}
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

      <input type="hidden" name="product-name" value={productName} />

      <div id="order-error" aria-live="polite" aria-atomic="true">
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
