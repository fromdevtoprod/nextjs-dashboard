import { fetchCareFromRenataCategory } from '@/app/lib/data/care';
import { fetchCureCatalog } from '@/app/lib/data/cure';
import { fetchCustomers } from '@/app/lib/data/customers';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/orders/create-form';

export default async function Page() {
  const cares = await fetchCareFromRenataCategory();
  const cures = await fetchCureCatalog();
  const customers = await fetchCustomers();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Orders', href: '/dashboard/orders' },
          {
            label: 'Add Order',
            href: '/dashboard/orders/add',
            active: true,
          },
        ]}
      />
      <Form cares={cares} cures={cures} customers={customers} />
    </main>
  );
}
