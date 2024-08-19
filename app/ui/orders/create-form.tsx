'use client';

// @ts-ignore
import { useActionState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createOrder } from '@/app/lib/actions/orders';
import { Care, CureWithCareData, CustomerField } from '@/app/lib/definitions';
import SelectCustomer from './select-customer';
import SelectProduct from './select-product';
import SelectPaymentStatus from './select-payment-status';

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
        <SelectCustomer customers={customers} errors={state.errors} />
        <SelectProduct cares={cares} cures={cures} errors={state.errors} />
        <SelectPaymentStatus />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/orders"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Cure</Button>
      </div>
    </form>
  );
}
