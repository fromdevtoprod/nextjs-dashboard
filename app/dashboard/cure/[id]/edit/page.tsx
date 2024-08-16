import { fetchCureById } from '@/app/lib/data/cure';
import Form from '@/app/ui/cure/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const cure = await fetchCureById(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Care', href: '/dashboard/care' },
          {
            label: 'Edit Care',
            href: `/dashboard/care/${id}/edit}`,
            active: true,
          },
        ]}
      />
      <Form cure={cure} />
    </main>
  );
}
