'use client';

// @ts-ignore
import { useActionState, useState } from 'react';
import { updateOrder } from '@/app/lib/actions/orders';
import { Care, Cure, CustomerField, Order } from '@/app/lib/definitions';
import { Button } from '../button';
import CancelButton from '../cancel-button';
import SelectCustomer from '../select-customer';
import SelectProduct from '../select-product';
import SelectPaymentStatus from './select-payment-status';
import FormErrorMessage from '../form-error-message';
import SelectProductType from '../select-product-type';

const initialState = { message: null, error: {} };

export default function Form({
  cares,
  cures,
  customers,
  order,
}: {
  cares: Care[];
  cures: Cure[];
  customers: CustomerField[];
  order: Order;
}) {
  const updateOrderWithId = updateOrder.bind(null, order.id);
  const [state, formAction] = useActionState(updateOrderWithId, initialState);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(
    order.customer_id,
  );
  const [selectedProductType, setSelectedProductType] = useState<
    'care' | 'cure'
  >(order.product_type);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <SelectCustomer
          customers={customers}
          errors={state.errors?.customer || []}
          selectedCustomerId={selectedCustomerId}
          onCustomerSelect={setSelectedCustomerId}
        />
        <SelectProductType
          errors={state.errors?.product_type || []}
          onProductTypeSelect={setSelectedProductType}
          value={`${order.product_type}`}
        />
        <SelectProduct
          productType={selectedProductType}
          products={selectedProductType === 'care' ? cares : cures}
          errors={state.errors?.product || []}
          value={`${order.product_id}`}
        />
        <SelectPaymentStatus
          errors={state.errors?.status || []}
          value={order.payment_status}
        />
        <FormErrorMessage message={state.message} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/orders" />
        <Button type="submit">Update Order</Button>
      </div>
    </form>
  );
}
