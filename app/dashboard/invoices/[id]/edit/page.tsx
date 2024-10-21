import { notFound } from 'next/navigation';
import { fetchInvoiceById } from '@/app/lib/data/invoices';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';
import { fetchAllCustomers } from '@/app/lib/data/customers';
import { auth } from '@/auth';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  const { id } = params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchAllCustomers(session.user.email),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
