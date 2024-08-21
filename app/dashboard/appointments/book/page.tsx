import { fetchCustomers } from '@/app/lib/data/customers';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/appointments/create-form';

export default async function Page() {
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
      <Form customers={customers} />
    </main>
  );
}
