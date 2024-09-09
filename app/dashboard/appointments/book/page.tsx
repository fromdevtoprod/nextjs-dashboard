import { redirect } from 'next/navigation';
import { fetchCustomerById } from '@/app/lib/data/customers';
import { SelectCareForAppointmentForm } from '@/app/ui/appointments/select-care-for-appointment-form';
import { fetchPendingOrdersByCustomer } from '@/app/lib/data/orders';
import {
  getAvailableCaresByCustomer,
  getAvailableCaresInCure,
} from '@/app/business/appointments';
import { hasCareProductType } from '@/app/business/care';
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
  const { customerId, date, productType, time } = searchParams;
  const customer = await fetchCustomerById(customerId);

  if (hasCareProductType(productType)) {
    const availableCares = await getAvailableCaresByCustomer(customer.id);
    return (
      <Container>
        <SelectCareForAppointmentForm
          cares={availableCares}
          customer={customer}
          date={date || getCurrentDate()}
          orderId=""
          time={time}
        />
      </Container>
    );
  }

  const pendingOrders = await fetchPendingOrdersByCustomer(customerId);

  if (pendingOrders.length > 1) {
    throw new Error('Customer has more than one pending order.');
  } else if (pendingOrders.length === 0) {
    return redirect('/dashboard/orders/add');
  }

  const pendingOrder = pendingOrders[0];
  const cares = await getAvailableCaresInCure({
    orderId: pendingOrder.id,
    productId: pendingOrder.product_id,
  });
  return (
    <Container>
      <SelectCareForAppointmentForm
        cares={cares}
        customer={customer}
        date={date || getCurrentDate()}
        orderId={pendingOrder.id}
        time={time}
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
