import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CustomerAppointments } from './customer-appointments';

type CustomerHistoryProps = {
  selectedCustomer: any;
};

export function CustomerHistory({ selectedCustomer }: CustomerHistoryProps) {
  const t = useTranslations('History');

  if (!selectedCustomer) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-[#2C3E50]">{t('noResult')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('client.title', { name: selectedCustomer.name })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">{t('client.date')}</TableHead>
              <TableHead className="w-[200px]">{t('client.type')}</TableHead>
              <TableHead>{t('client.notes')}</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            <CustomerAppointments selectedCustomerId={selectedCustomer.id} />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
