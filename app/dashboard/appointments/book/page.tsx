import { redirect } from 'next/navigation';
import { fetchCustomerById } from '@/app/lib/data/customers';
import { SelectCareForAppointmentForm } from '@/app/ui/appointments/select-care-for-appointment-form';
import { fetchPendingOrdersByCustomer } from '@/app/lib/data/orders';
import {
  getAvailableCares,
  getAvailableCaresInCure,
} from '@/app/business/appointments';
import { isCareProductType } from '@/app/business/care';
import { ProductType } from '@/app/lib/definitions';
import { Container } from './container';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    date?: string;
    customerId: string;
    productType: ProductType;
    time: string;
  };
}) {
  const customer = await fetchCustomerById(searchParams.customerId);
  if (isCareProductType(searchParams.productType)) {
    const availableCares = await getAvailableCares();
    return (
      <Container>
        <SelectCareForAppointmentForm
          cares={availableCares}
          customer={customer}
          date={searchParams.date || getCurrentDate()}
          orderId=""
          time={searchParams.time}
        />
      </Container>
    );
  }

  const pendingOrder = await fetchPendingOrdersByCustomer(
    searchParams.customerId,
  );

  if (pendingOrder.length > 1) {
    throw new Error('Customer has more than one pending order.');
  }

  if (pendingOrder.length === 0) {
    return redirect('/dashboard/orders/add');
  }

  const cares = await getAvailableCaresInCure({
    orderId: pendingOrder[0].id,
    productId: pendingOrder[0].product_id,
  });
  return (
    <Container>
      <SelectCareForAppointmentForm
        cares={cares}
        customer={customer}
        date={searchParams.date || getCurrentDate()}
        orderId={pendingOrder[0].id}
        time={searchParams.time}
      />
    </Container>
  );
}

/**
 * Should return the current date with this format : YYYY-MM-DD
 */
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}
