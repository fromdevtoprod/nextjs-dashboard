import { FileHeart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function CaresLoadingSkeleton() {
  const t = useTranslations('Cares');
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
          Cares
        </h1>
        <Button
          className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
          disabled={true}
        >
          <FileHeart className="mr-2 h-5 w-5" />
          {t('addCare')}
        </Button>
      </div>
      <SkeletonCard />
    </main>
  );
}

function SkeletonCard() {
  const t = useTranslations('Cares');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('cares')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('duration')}</TableHead>
              <TableHead>{t('price')}</TableHead>
              <TableHead>{t('type')}</TableHead>
              <TableHead>{t('sessions')}</TableHead>
              <TableHead>{t('actions')}</TableHead>
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
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
    </TableRow>
  );
}
