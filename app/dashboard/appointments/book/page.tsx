import { redirect } from 'next/navigation';
import { fetchCustomerById } from '@/app/lib/data/customers';
import { SelectCareForAppointmentForm } from '@/app/ui/appointments/select-care-for-appointment-form';
import { ProductType } from '@/app/lib/definitions';
import { fetchPendingCureOrderByCustomer } from '@/app/lib/data/orders';
import { Container } from './container';
import {
  fetchAvailableCaresByCure,
  fetchAvailableCaresByCustomer,
} from '@/app/lib/data/care';
import { fetchCureById } from '@/app/lib/data/cure';

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

  if (productType === 'care') {
    const availableCares = await fetchAvailableCaresByCustomer(customer.id);
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

  const pendingCureOrder = await fetchPendingCureOrderByCustomer(customerId);
  if (!pendingCureOrder) {
    return redirect('/dashboard/orders/add');
  }

  const cure = await fetchCureById(pendingCureOrder.product_id);
  const cares = await fetchAvailableCaresByCure({
    care_1_id: cure.care_1_id,
    care_1_session_number: cure.care_1_session_number,
    care_2_id: cure.care_2_id,
    care_2_session_number: cure.care_2_session_number,
    orderId: pendingCureOrder.id,
  });
  return (
    <Container>
      <SelectCareForAppointmentForm
        cares={cares}
        customer={customer}
        date={date || getCurrentDate()}
        orderId={pendingCureOrder.id}
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
