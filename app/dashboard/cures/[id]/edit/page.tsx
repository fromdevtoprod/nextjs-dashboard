import { fetchCureById } from '@/app/lib/data/cure';
import { EditCureForm } from '@/app/ui/cure/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCareFromRenataCategory } from '@/app/lib/data/care';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const cares = await fetchCareFromRenataCategory();
  const cure = await fetchCureById(id);
  console.log('cure', cure);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cures', href: '/dashboard/cures' },
          {
            label: 'Edit Cure',
            href: `/dashboard/cures/${id}/edit}`,
            active: true,
          },
        ]}
      />
      <EditCureForm cares={cares} cure={cure} />
    </main>
  );
}
