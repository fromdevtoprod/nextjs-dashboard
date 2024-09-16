import { fetchOrderById } from '@/app/lib/data/orders';
import { EditOrderForm } from '@/app/ui/orders/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCareFromRenataCategory } from '@/app/lib/data/care';
import { fetchAllCures } from '@/app/lib/data/cure';
import { fetchAllCustomers } from '@/app/lib/data/customers';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const order = await fetchOrderById(id);
  const cares = await fetchCareFromRenataCategory();
  const cures = await fetchAllCures();
  const customers = await fetchAllCustomers();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Order', href: '/dashboard/orders' },
          {
            label: 'Edit Order',
            href: `/dashboard/orders/${id}/edit}`,
            active: true,
          },
        ]}
      />
      <EditOrderForm
        cares={cares}
        cures={cures}
        customers={customers}
        order={order}
      />
    </main>
  );
}
