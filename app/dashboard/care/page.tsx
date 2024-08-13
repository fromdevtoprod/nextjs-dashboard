import { Suspense } from 'react';
import { Metadata } from 'next';
import Table from '@/app/ui/care/table';
import { lusitana } from '@/app/ui/fonts';
import { CreateCare } from '@/app/ui/care/buttons';
import { CareTableSkeleton } from '@/app/ui/care/skeletons';

export const metadata: Metadata = {
  title: 'Care',
};

export default async function Page() {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>Care</h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateCare />
      </div>
      <Suspense fallback={<CareTableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
