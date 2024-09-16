import { fetchAllCareCategories } from '@/app/lib/data/care';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { CreateCareForm } from '@/app/ui/care/create-form';

export default async function Page() {
  const categories = await fetchAllCareCategories();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cares', href: '/dashboard/cares' },
          {
            label: 'Create Care',
            href: '/dashboard/cares/create',
            active: true,
          },
        ]}
      />
      <CreateCareForm categories={categories} />
    </main>
  );
}
