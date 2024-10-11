import { Search, UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PackagesLoadingSkeleton() {
  const t = useTranslations('Packages');
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
          {t('title')}
        </h1>
        <Button
          className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
          disabled={true}
        >
          <UserPlus className="mr-2 h-5 w-5" />
          {t('startNewPackage')}
        </Button>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Search className="text-[#7C9885]" />
            <Input placeholder={t('searchPlaceholder')} className="flex-1" />
          </div>
        </CardContent>
      </Card>

      <SkeletonCard />
    </main>
  );
}

function SkeletonCard() {
  const t = useTranslations('Packages');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('packagesInProgress')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('client')}</TableHead>
              <TableHead>{t('package')}</TableHead>
              <TableHead>{t('remainingSessions')}</TableHead>
              <TableHead>{t('startDate')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(4)].map((_, index) => (
              <SkeletonRow key={index} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
    </TableRow>
  );
}
