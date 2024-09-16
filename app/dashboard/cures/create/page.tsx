import { fetchCareFromRenataCategory } from '@/app/lib/data/care';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { CreateCureForm } from '@/app/ui/cure/create-form';

export default async function Page() {
  const cares = await fetchCareFromRenataCategory();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cures', href: '/dashboard/cures' },
          {
            label: 'Create Cure',
            href: '/dashboard/cures/create',
            active: true,
          },
        ]}
      />
      <CreateCureForm cares={cares} />
    </main>
  );
}
