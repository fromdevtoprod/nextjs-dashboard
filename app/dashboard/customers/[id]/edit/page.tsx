import { fetchCustomerById } from '@/app/lib/data/customers';
import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const customer = await fetchCustomerById(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Edit Customer',
            href: `/dashboard/customers/${id}/edit}`,
            active: true,
          },
        ]}
      />
      <Form customer={customer} />
    </main>
  );
}
