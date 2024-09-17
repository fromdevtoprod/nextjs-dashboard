import { redirect } from 'next/navigation';
import { ProductType } from '@/src/application/repositories/orders.repository.interface';
import { fetchAvailableCares } from '@/app/lib/data/care';
import { fetchCustomerById } from '@/app/lib/data/customers';
import { SelectCareForAppointmentForm } from '@/app/ui/appointments/select-care-for-appointment-form';
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
  const { cares: availableCares, orderId } = await fetchAvailableCares(
    customerId,
    productType,
  );

  if (availableCares.length === 0) {
    return redirect('/dashboard/orders/add');
  }

  return (
    <Container>
      <SelectCareForAppointmentForm
        cares={availableCares}
        customer={customer}
        date={date || getCurrentDate()}
        orderId={orderId}
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
