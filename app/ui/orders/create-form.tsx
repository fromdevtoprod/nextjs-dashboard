'use client';

// @ts-ignore
import { useActionState, useState } from 'react';
import { createOrder } from '@/app/lib/actions/orders';
import {
  CareShortDescription,
  Cure,
  CustomerField,
  ProductType,
} from '@/app/lib/definitions';
import { Button } from '../button';
import SelectCustomer from '../select-customer';
import { SelectProduct } from '../select-product';
import SelectPaymentStatus from './select-payment-status';
import CancelButton from '../cancel-button';
import FormErrorMessage from '../form-error-message';
import SelectProductType from '../select-product-type';

const initialState = { message: null, error: {} };

export function AddOrderForm({
  cares,
  cures,
  customers,
}: {
  cares: CareShortDescription[];
  cures: Cure[];
  customers: CustomerField[];
}) {
  const [state, formAction] = useActionState(createOrder, initialState);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [selectedProductType, setSelectedProductType] = useState<ProductType>();
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
        />
        {selectedProductType && (
          <SelectProduct
            productType={selectedProductType}
            products={selectedProductType === 'care' ? cares : cures}
            errors={state.errors?.product || []}
          />
        )}
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
