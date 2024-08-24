import { fetchCustomerById } from '@/app/lib/data/customers';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/appointments/create-form';
import { fetchCareFromRenataCategory } from '@/app/lib/data/care';
import { fetchCureCatalog } from '@/app/lib/data/cure';

export default async function Page({
  searchParams,
}: {
  searchParams: { date?: string; customerId: string };
}) {
  const customer = await fetchCustomerById(searchParams.customerId);
  const cares = await fetchCareFromRenataCategory();
  // It should be replaced by a function that fetches all available cures for this customer
  // If the customer has already one cure in progress, it should be the only one returned by this function
  const cures = await fetchCureCatalog();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Appointments', href: '/dashboard/appointments' },
          {
            label: 'Book Appointment',
            href: '/dashboard/appointments/book',
            active: true,
          },
        ]}
      />
      <Form
        cares={cares}
        cures={cures}
        customer={customer}
        date={searchParams.date || getCurrentDate()}
      />
    </main>
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
