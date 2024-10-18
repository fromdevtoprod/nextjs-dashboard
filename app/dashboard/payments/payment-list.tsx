import { useTranslations } from 'next-intl';
import {
  Banknote,
  Calendar,
  CreditCard,
  DollarSign,
  HandHeart,
  House,
  UserIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Payment } from '@/src/entities/models/payment';
import { EditButton } from '@/app/ui/buttons/edit-button';
import { DeletePaymentConfirmation } from './delete-payment-confirmation';
import { PaymentStatusBadge } from '@/app/ui/badges/payment-status-badge';
import { capitalize } from '@/app/lib/utils';
import { PaymentMethod } from '@/app/ui/payment-method';

type PaymentListProps = {
  filteredPayments: Payment[];
  onDeleteClick: (paymentId: string) => void;
  onEditClick: (payment: Payment) => void;
};

export function PaymentList({
  filteredPayments,
  onDeleteClick,
  onEditClick,
}: PaymentListProps) {
  const t = useTranslations('Payments');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('paymentHistory')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('client')}</TableHead>
                <TableHead>{t('care')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('amount')}</TableHead>
                <TableHead>{t('method.label')}</TableHead>
                <TableHead>{t('status.label')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="inline-flex">
                      <UserIcon className="mr-2 h-4 w-4 self-center" />
                      {payment.customer.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <HandHeart className="mr-2 h-4 w-4 self-center" />
                      {payment.appointment.appointmentType.name}
                      {payment.packageId && ' (Package)'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex">
                      <Calendar className="mr-2 h-4 w-4 self-center" />
                      {new Date(payment.date).toISOString().split('T')[0]}
                    </div>
                  </TableCell>
                  <TableCell>{`${payment.amount.toFixed(2)} ${t('currency')}`}</TableCell>
                  <TableCell>
                    <div className="inline-flex">
                      <PaymentMethod method={payment.method} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={payment.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <EditButton onClick={() => onEditClick(payment)} />
                      {/* <DeletePaymentConfirmation
                        paymentId={payment.id}
                        whenDeleteDone={() => onDeleteClick(payment.id)}
                      /> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
