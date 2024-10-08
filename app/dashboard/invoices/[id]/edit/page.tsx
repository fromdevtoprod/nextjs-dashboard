import { notFound } from 'next/navigation';
import { fetchInvoiceById } from '@/app/lib/data/invoices';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';
import { fetchAllCustomers } from '@/app/lib/data/customers';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchAllCustomers(),
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
