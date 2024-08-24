'use client';

// @ts-ignore
import { useActionState, useEffect, useState } from 'react';
import { createAppointment } from '@/app/lib/actions/appointments';
import { Care, CustomerField } from '@/app/lib/definitions';
import { Button } from '../button';
import SelectCustomer from '../select-customer';
import CancelButton from '../cancel-button';
import FormErrorMessage from '../form-error-message';
import TimeInput from '../time-input';
import SelectOrder, { OrderOption } from '../select-order';
import SelectCare from '../select-care';

const initialState = { message: null, error: {} };

export default function Form({
  customers,
  date,
}: {
  customers: CustomerField[];
  date: string;
}) {
  const [state, formAction] = useActionState(createAppointment, initialState);
  const [orders, setOrders] = useState<OrderOption[]>([]);
  const [cares, setCares] = useState<Care[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  useEffect(() => {
    if (selectedCustomerId) {
      fetch(`/api/orders?customer_id=${selectedCustomerId}`)
        .then((res) => res.json() as Promise<OrderOption[]>)
        .then(setOrders);
    }
  }, [selectedCustomerId]);

  useEffect(() => {
    if (selectedOrderId) {
      const order = orders.find((order) => order.id === selectedOrderId);
      if (!order?.product_id || !order.product_type)
        throw new Error('Product ID not found');
      fetch(
        `/api/cares?product_id=${order.product_id}&product_type=${order.product_type}`,
      )
        .then((res) => res.json() as Promise<Care[]>)
        .then(setCares);
    }
  }, [selectedOrderId]);

  console.log('selectedProductId', selectedProductId);
  console.log('cares', cares);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <SelectCustomer
          customers={customers}
          errors={state.errors?.customer || []}
          selectedCustomerId={selectedCustomerId}
          onCustomerSelect={setSelectedCustomerId}
        />
        {selectedCustomerId && orders.length > 0 && (
          <SelectOrder
            orders={orders}
            errors={state.errors?.product || []}
            selectedOrderId={selectedOrderId}
            onOrderSelect={setSelectedOrderId}
          />
        )}
        {selectedOrderId && cares.length > 0 && (
          <SelectCare
            cares={cares}
            errors={state.errors?.care || []}
            onCareSelect={setSelectedProductId}
          />
        )}
        {selectedProductId && (
          <TimeInput
            errors={state.errors?.time || []}
            careDuration={
              cares.find((care) => care.product_id === selectedProductId)
                ?.duration || 0
            }
          />
        )}
        <FormErrorMessage message={state.message} />

        <input type="hidden" name="date" value={date} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/appointments" />
        <Button type="submit">Book Appointment</Button>
      </div>
    </form>
  );
}
