'use client';

// @ts-ignore
import { useActionState, useEffect, useState } from 'react';
import { createAppointment } from '@/app/lib/actions/appointments';
import { CustomerField } from '@/app/lib/definitions';
import { Button } from '../button';
import SelectCustomer from '../select-customer';
import CancelButton from '../cancel-button';
import FormErrorMessage from '../form-error-message';
import TimeInput from '../time-input';
import SelectOrder, { OrderOption } from '../select-order';

const initialState = { message: null, error: {} };

export default function Form({ customers }: { customers: CustomerField[] }) {
  const [state, formAction] = useActionState(createAppointment, initialState);
  const [orders, setOrders] = useState<OrderOption[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<string>('');

  useEffect(() => {
    fetch('/api/orders?customer_id=' + selectedCustomer)
      .then((res) => res.json() as Promise<OrderOption[]>)
      .then(setOrders);
  }, [selectedCustomer]);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <SelectCustomer
          customers={customers}
          errors={state.errors?.customer || []}
          selectedCustomer={selectedCustomer}
          onCustomerSelect={setSelectedCustomer}
        />
        {selectedCustomer && orders.length > 0 && (
          <SelectOrder
            orders={orders}
            errors={state.errors?.product || []}
            selectedOrder={selectedOrder}
            onOrderSelect={setSelectedOrder}
          />
        )}
        {selectedOrder && <TimeInput errors={state.errors?.time || []} />}
        <FormErrorMessage message={state.message} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/appointments" />
        <Button type="submit">Book Appointment</Button>
      </div>
    </form>
  );
}
