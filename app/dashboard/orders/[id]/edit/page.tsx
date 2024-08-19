import { fetchCureById } from '@/app/lib/data/cure';
import Form from '@/app/ui/orders/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const cure = await fetchCureById(id);
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
      <Form cure={cure} />
    </main>
  );
}
