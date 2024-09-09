import { Suspense } from 'react';
import { Metadata } from 'next';
import Table from '@/app/ui/orders/table';
import { lusitana } from '@/app/ui/fonts';
import { OrdersTableSkeleton } from '@/app/ui/orders/skeletons';
import { AddButtonLink } from '@/app/ui/buttons/add-link';

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Orders</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AddButtonLink href="/dashboard/orders/add" label="Add Order" />
      </div>
      <Suspense fallback={<OrdersTableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
