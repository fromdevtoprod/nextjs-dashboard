'use client';

// @ts-ignore
import { useActionState, useState } from 'react';
import { updateOrder } from '@/app/lib/actions/orders';
import { SelectedCare } from '@/src/entities/models/care';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { SelectedCure } from '@/src/entities/models/cure';
import { Button } from '../button';
import CancelButton from '../buttons/cancel-button';
import SelectCustomer from '../select-customer';
import { SelectProduct } from '../select-product';
import SelectPaymentStatus from './select-payment-status';
import FormErrorMessage from '../form-error-message';
import SelectProductType from '../select-product-type';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const initialState = { message: null, error: {} };

export function EditOrderForm({
  cares,
  cures,
  customers,
  customerId,
  paymentStatus,
  productId,
  productType,
  orderId,
}: {
  cares: SelectedCare[];
  cures: SelectedCure[];
  customers: SelectedCustomer[];
  customerId: string;
  paymentStatus: string;
  productId: string;
  productType: string;
  orderId: string;
}) {
  const updateOrderWithId = updateOrder.bind(null, orderId);
  const [state, formAction] = useActionState(updateOrderWithId, initialState);
  const [selectedCustomerId, setSelectedCustomerId] =
    useState<string>(customerId);
  const [selectedProductType, setSelectedProductType] =
    useState<string>(productType);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <SelectCustomer
          customers={customers}
          errors={state.errors?.customer || []}
          isDisabled={true}
          selectedCustomerId={selectedCustomerId}
          onCustomerSelect={setSelectedCustomerId}
        />
        <SelectProductType
          errors={state.errors?.product_type || []}
          isDisabled={true}
          onProductTypeSelect={setSelectedProductType}
          value={`${productType}`}
        />
        <SelectProduct
          errors={state.errors?.product || []}
          isDisabled={true}
          label=""
          products={selectedProductType === 'care' ? cares : cures}
          productType={selectedProductType}
          value={`${productId}`}
        />
        <SelectPaymentStatus
          errors={state.errors?.status || []}
          value={paymentStatus}
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
