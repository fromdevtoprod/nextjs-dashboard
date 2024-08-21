import { fetchCareFromRenataCategory } from '@/app/lib/data/care';
import { fetchCureCatalog } from '@/app/lib/data/cure';
import { fetchCustomers } from '@/app/lib/data/customers';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/appointments/create-form';

export default async function Page() {
  const cares = await fetchCareFromRenataCategory();
  const cures = await fetchCureCatalog();
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
      <Form cares={cares} cures={cures} customers={customers} />
    </main>
  );
}
