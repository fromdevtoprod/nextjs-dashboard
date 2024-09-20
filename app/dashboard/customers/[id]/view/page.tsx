import { fetchAppointmentsByCustomer } from '@/app/lib/data/appointments';
import { fetchCustomerById } from '@/app/lib/data/customers';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { ViewCustomerForm } from '@/app/ui/customers/view-form';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const customer = await fetchCustomerById(id);
  const appointments = await fetchAppointmentsByCustomer(customer.id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'View Customer',
            href: `/dashboard/customers/${id}/view}`,
            active: true,
          },
        ]}
      />
      <ViewCustomerForm
        customer={customer}
        appointments={Array.from(appointments)}
      />
    </main>
  );
}
