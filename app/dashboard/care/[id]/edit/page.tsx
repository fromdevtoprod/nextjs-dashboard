import { fetchCareById, fetchCareCategories } from '@/app/lib/data/care';
import Form from '@/app/ui/care/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const care = await fetchCareById(id);
  const categories = await fetchCareCategories();
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
      <Form care={care} categories={categories} />
    </main>
  );
}
