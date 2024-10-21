import { getUserEmail } from '@/app/lib/auth-utils';
import { fetchAllCustomers } from '@/app/lib/data/customers';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/invoices/create-form';

export default async function Page() {
  const userEmail = await getUserEmail();
  const customers = await fetchAllCustomers(userEmail);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
