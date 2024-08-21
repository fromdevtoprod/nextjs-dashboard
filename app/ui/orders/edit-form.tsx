'use client';

// @ts-ignore
import { useActionState, useState } from 'react';
import { Button } from '../button';
import { updateOrder } from '@/app/lib/actions/orders';
import {
  Care,
  CureWithCareData,
  CustomerField,
  Order,
} from '@/app/lib/definitions';
import CancelButton from '../cancel-button';
import SelectCustomer from '../select-customer';
import SelectProduct from '../select-product';
import SelectPaymentStatus from './select-payment-status';
import FormErrorMessage from '../form-error-message';

const initialState = { message: null, error: {} };

export default function Form({
  cares,
  cures,
  customers,
  order,
}: {
  cares: Care[];
  cures: CureWithCareData[];
  customers: CustomerField[];
  order: Order;
}) {
  const updateOrderWithId = updateOrder.bind(null, order.id);
  const [state, formAction] = useActionState(updateOrderWithId, initialState);
  const [selectedCustomer, setSelectedCustomer] = useState<string>(
    order.customer_id,
  );
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <SelectCustomer
          customers={customers}
          errors={state.errors?.customer || []}
          selectedCustomer={selectedCustomer}
          onCustomerSelect={(newCustomer) => setSelectedCustomer(newCustomer)}
        />
        <SelectProduct
          cares={cares}
          cures={cures}
          errors={state.errors?.product || []}
          value={`${order.product_id}`}
          defaultProductType={order.product_type}
        />
        <SelectPaymentStatus
          errors={state.errors?.status || []}
          value={order.status}
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
