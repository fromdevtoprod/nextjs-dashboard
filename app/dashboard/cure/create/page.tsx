import { fetchCareFromRenataCategory } from '@/app/lib/data/care';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { CreateCureForm } from '@/app/ui/cure/create-form';

export default async function Page() {
  const cares = await fetchCareFromRenataCategory();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cure', href: '/dashboard/cure' },
          {
            label: 'Create Cure',
            href: '/dashboard/cure/create',
            active: true,
          },
        ]}
      />
      <CreateCureForm cares={cares} />
    </main>
  );
}
