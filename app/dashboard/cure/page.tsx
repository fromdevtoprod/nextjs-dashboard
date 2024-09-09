import { Suspense } from 'react';
import { Metadata } from 'next';
import Table from '@/app/ui/cure/table';
import { lusitana } from '@/app/ui/fonts';
import { CureTableSkeleton } from '@/app/ui/cure/skeletons';
import { AddButtonLink } from '@/app/ui/buttons/add-link';

export const metadata: Metadata = {
  title: 'Cure',
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Cure</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AddButtonLink href="/dashboard/cure/create" label="Create Cure" />
      </div>
      <Suspense fallback={<CureTableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
