import { Suspense } from 'react';
import { Metadata } from 'next';
import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CustomersTableSkeleton } from '@/app/ui/customers/skeletons';

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
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <Suspense fallback={<CustomersTableSkeleton />}>
        <Table query={query} />
      </Suspense>
    </div>
  );
}
