import { fetchCustomerById } from '@/app/lib/data/customers';
import { SelectCareForm } from '@/app/ui/appointments/select-care-form';
import {
  fetchCareByProduct,
  fetchCareFromRenataCategory,
} from '@/app/lib/data/care';
import { fetchPendingCureByCustomer } from '@/app/lib/data/cure';
import { Care } from '@/app/lib/definitions';
import { Container } from './container';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    date?: string;
    customerId: string;
    productType: 'care' | 'cure';
    time: string;
  };
}) {
  const customer = await fetchCustomerById(searchParams.customerId);
  if (searchParams.productType === 'care') {
    // const cares = await fetchCareFromRenataCategory();
    // return (
    //   <Container>
    //     <SelectCareForm
    //       cares={cares}
    //       customer={customer}
    //       date={searchParams.date || getCurrentDate()}
    //       time={searchParams.time}
    //     />
    //   </Container>
    // );

    // Implement a specific form for the care product type not in a cure
    throw new Error('TODO.');
  }

  const pendingCure = await fetchPendingCureByCustomer(searchParams.customerId);
  console.log('pendingCure', pendingCure);
  if (pendingCure.length > 1) {
    throw new Error('Customer has more than one pending cure.');
  }

  // We'll deal with this case later
  // Right now, we'll just throw an error
  // Because the customer needs to order a cure first
  if (pendingCure.length === 0) {
    throw new Error('Customer has no pending cure.');
  }

  const cares = (await fetchCareByProduct({
    productId: pendingCure[0].product_id,
    productType: 'cure',
  })) as Care[];
  return (
    <Container>
      <SelectCareForm
        cares={cares}
        customer={customer}
        date={searchParams.date || getCurrentDate()}
        orderId={pendingCure[0].product_id}
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
