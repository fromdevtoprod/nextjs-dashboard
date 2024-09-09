import { redirect } from 'next/navigation';
import { fetchCustomerById } from '@/app/lib/data/customers';
import { SelectCareForAppointmentForm } from '@/app/ui/appointments/select-care-for-appointment-form';
import {
  getAvailableCaresByCustomer,
  hasCareProductType,
} from '@/app/business/care';
import { getAvailableCaresInCure } from '@/app/business/cure';
import { ProductType } from '@/app/lib/definitions';
import { Container } from './container';
import { findPendingCureByCustomer } from '@/app/business/order';

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

  const pendingCure = await findPendingCureByCustomer(customerId);
  if (!pendingCure) {
    return redirect('/dashboard/orders/add');
  }

  const cares = await getAvailableCaresInCure({
    orderId: pendingCure.id,
    productId: pendingCure.product_id,
  });
  return (
    <Container>
      <SelectCareForAppointmentForm
        cares={cares}
        customer={customer}
        date={date || getCurrentDate()}
        orderId={pendingCure.id}
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
