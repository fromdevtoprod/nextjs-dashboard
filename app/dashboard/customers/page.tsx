import { Suspense } from 'react';
import { Metadata } from 'next';
import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CustomersTableSkeleton } from '@/app/ui/customers/skeletons';
import { AddButtonLink } from '@/app/ui/buttons/add-link';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string; page?: number };
}) {
  const query = searchParams.query || '';
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <AddButtonLink
          href="/dashboard/customers/create"
          label="Create Customer"
        />
      </div>
      <Suspense fallback={<CustomersTableSkeleton />}>
        <Table query={query} />
      </Suspense>
    </div>
  );
}
