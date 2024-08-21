import { fetchCustomers } from '@/app/lib/data/customers';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/appointments/create-form';

export default async function Page({
  searchParams,
}: {
  searchParams: { date?: string };
}) {
  const customers = await fetchCustomers();
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
        customers={customers}
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
