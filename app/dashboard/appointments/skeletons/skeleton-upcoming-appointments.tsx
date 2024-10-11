'use client';

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

export function SkeletonUpcomingAppointments() {
  const t = useTranslations('Appointments');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('upcomingAppointments')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('client')}</TableHead>
              <TableHead>{t('type')}</TableHead>
              <TableHead>{t('date')}</TableHead>
              <TableHead>{t('time')}</TableHead>
              <TableHead>{t('package')}</TableHead>
              <TableHead>{t('payment')}</TableHead>
              <TableHead>{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4].map((index) => (
              <SkeletonTableRow key={index} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SkeletonTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-6 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-24" />
      </TableCell>
    </TableRow>
  );
}
