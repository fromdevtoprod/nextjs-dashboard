import { Suspense } from 'react';
import { Metadata } from 'next';
import { CaresTable } from '@/app/ui/care/table';
import { lusitana } from '@/app/ui/fonts';
import { CareTableSkeleton } from '@/app/ui/care/skeletons';
import { AddButtonLink } from '@/app/ui/buttons/add-link';

export const metadata: Metadata = {
  title: 'Cares',
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Cares</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AddButtonLink href="/dashboard/care/create" label="Create Care" />
      </div>
      <Suspense fallback={<CareTableSkeleton />}>
        <CaresTable />
      </Suspense>
    </div>
  );
}
