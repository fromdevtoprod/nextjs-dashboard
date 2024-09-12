import { fetchCareById, fetchCareCategories } from '@/app/lib/data/care';
import { EditCareForm } from '@/app/ui/care/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const care = await fetchCareById(id);
  const categories = await fetchCareCategories();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cares', href: '/dashboard/cares' },
          {
            label: 'Edit Care',
            href: `/dashboard/cares/${id}/edit}`,
            active: true,
          },
        ]}
      />
      <EditCareForm care={care} categories={categories} />
    </main>
  );
}
