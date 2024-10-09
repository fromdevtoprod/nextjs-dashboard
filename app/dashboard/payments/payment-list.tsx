import {
  Banknote,
  Calendar,
  CreditCard,
  DollarSign,
  Hand,
  Heart,
  House,
  Package,
  Timer,
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
import { SelectedPayment } from '@/src/entities/models/payment';
import { EditButton } from '@/app/ui/buttons/edit-button';
import { DeletePaymentConfirmation } from './delete-payment-confirmation';
import { PaymentStatusBadge } from '@/app/ui/badges/payment-status-badge';

type PaymentListProps = {
  filteredPayments: SelectedPayment[];
  onDeleteClick: (paymentId: string) => void;
  onEditClick: (payment: SelectedPayment) => void;
};

export function PaymentList({
  filteredPayments,
  onDeleteClick,
  onEditClick,
}: PaymentListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Care</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="inline-flex">
                      <UserIcon className="mr-2 h-4 w-4 self-center" />
                      {payment.customer_name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Timer className="mr-2 h-4 w-4 self-center" />
                      {payment.appointment_type_name}
                      {payment.package_id && ' (Package)'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex">
                      <Calendar className="mr-2 h-4 w-4 self-center" />
                      {new Date(payment.date).toISOString().split('T')[0]}
                    </div>
                  </TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="inline-flex">
                      <PaymentMethodIcon method={payment.method} />
                      {payment.method}
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

function PaymentMethodIcon({ method }: { method: string }) {
  switch (method) {
    case 'Card':
      return <CreditCard className="mr-2 h-4 w-4 self-center" />;
    case 'Cash':
      return <DollarSign className="mr-2 h-4 w-4 self-center" />;
    case 'Check':
      return <Banknote className="mr-2 h-4 w-4 self-center" />;
    case 'Transfer':
      return <House className="mr-2 h-4 w-4 self-center" />;
    default:
      return null;
  }
}
