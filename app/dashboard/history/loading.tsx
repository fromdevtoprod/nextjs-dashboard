import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export default function HistoryLoadingSkeleton() {
  const t = useTranslations('History');
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
          {t('title')}
        </h1>
      </div>

      <SelectCustomerSkeleton />

      <CustomerHistorySkeleton />
    </main>
  );
}

function SelectCustomerSkeleton() {
  return (
    <Card className="mb-8 w-min">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}

function CustomerHistorySkeleton() {
  const t = useTranslations('Clients');
  return (
    <Card>
      <CardContent className="pt-6">
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
}
