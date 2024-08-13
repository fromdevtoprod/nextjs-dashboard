import { fetchCareCategories } from '@/app/lib/data/care';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/care/create-form';

export default async function Page() {
  const categories = await fetchCareCategories();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Care', href: '/dashboard/care' },
          {
            label: 'Create Care',
            href: '/dashboard/care/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} />
    </main>
  );
}
