import { fetchCareFromRenataCategory } from '@/app/lib/data/care';
import { fetchAllCures } from '@/app/lib/data/cure';
import { fetchAllCustomers } from '@/app/lib/data/customers';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { AddOrderForm } from '@/app/ui/orders/create-form';

export default async function Page() {
  const cares = await fetchCareFromRenataCategory();
  const cures = await fetchAllCures();
  const customers = await fetchAllCustomers();
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
      <AddOrderForm cares={cares} cures={cures} customers={customers} />
    </main>
  );
}
