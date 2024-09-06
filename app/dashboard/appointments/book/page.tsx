import { fetchCustomerById } from '@/app/lib/data/customers';
import { SelectCareForm } from '@/app/ui/appointments/select-care-form';
import { fetchPendingOrdersByCustomer } from '@/app/lib/data/orders';
import { Container } from './container';
import { fetchCureById } from '@/app/lib/data/cure';
import { fetchCareById } from '@/app/lib/data/care';

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
  if (isCareProductType(searchParams.productType)) {
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

  const pendingOrder = await fetchPendingOrdersByCustomer(
    searchParams.customerId,
  );
  console.log('pendingOrder', pendingOrder);
  if (pendingOrder.length > 1) {
    throw new Error('Customer has more than one pending order.');
  }

  // We'll deal with this case later
  // Right now, we'll just throw an error
  // Because the customer needs to order a cure first
  if (pendingOrder.length === 0) {
    throw new Error('Customer has no cure order. Please order a cure.');
  }

  const cure = await fetchCureById(pendingOrder[0].product_id);
  // TODO: check how many appointments in the table for this order_id
  const cares = await Promise.all([
    fetchCareById(cure.care_1_id),
    fetchCareById(cure.care_2_id),
  ]);
  return (
    <Container>
      <SelectCareForm
        cares={cares}
        customer={customer}
        date={searchParams.date || getCurrentDate()}
        orderId={pendingOrder[0].id}
        productId={pendingOrder[0].product_id}
        time={searchParams.time}
      />
    </Container>
  );
}

function isCareProductType(productType: string) {
  return productType === 'care';
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
