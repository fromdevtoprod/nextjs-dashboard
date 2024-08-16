import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/cure/create-form';

export default async function Page() {
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
      <Form />
    </main>
  );
}
