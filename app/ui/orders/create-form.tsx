'use client';

// @ts-ignore
import { useActionState } from 'react';
import { createOrder } from '@/app/lib/actions/orders';
import { Care, CureWithCareData, CustomerField } from '@/app/lib/definitions';
import { Button } from '../button';
import SelectCustomer from './select-customer';
import SelectProduct from './select-product';
import SelectPaymentStatus from './select-payment-status';
import CancelButton from '../cancel-button';
import FormErrorMessage from '../form-error-message';

const initialState = { message: null, error: {} };

export default function Form({
  cares,
  cures,
  customers,
}: {
  cares: Care[];
  cures: CureWithCareData[];
  customers: CustomerField[];
}) {
  const [state, formAction] = useActionState(createOrder, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <SelectCustomer
          customers={customers}
          errors={state.errors?.customer || []}
        />
        <SelectProduct
          cares={cares}
          cures={cures}
          errors={state.errors?.product || []}
        />
        <SelectPaymentStatus errors={state.errors?.status || []} />
        <FormErrorMessage message={state.message} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/orders" />
        <Button type="submit">Add Order</Button>
      </div>
    </form>
  );
}
