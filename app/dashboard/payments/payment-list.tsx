import {
  Banknote,
  Calendar,
  CreditCard,
  DollarSign,
  House,
  Package,
  Timer,
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
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <CareTypeBadge
                      type={payment.appointment_id ? 'Appointment' : 'Package'}
                    />
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
                    <div className="inline-flex">
                      <Calendar className="mr-2 h-4 w-4 self-center" />
                      {payment.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <EditButton onClick={() => onEditClick(payment)} />
                      <DeletePaymentConfirmation
                        paymentId={payment.id}
                        whenDeleteDone={() => onDeleteClick(payment.id)}
                      />
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

function PaymentStatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'Paid':
      return (
        <span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          {status}
        </span>
      );
    case 'Pending':
      return (
        <span className="me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          {status}
        </span>
      );
    default:
      return null;
  }
}

function CareTypeBadge({ type }: { type: 'Appointment' | 'Package' }) {
  switch (type) {
    case 'Appointment':
      return (
        <div className="flex items-center">
          <Timer className="mr-2 h-4 w-4 self-center" />
          Appointment
        </div>
      );
    case 'Package':
      return (
        <div className="flex items-center">
          <Package className="mr-2 h-4 w-4 self-center" />
          Package
        </div>
      );
    default:
      return null;
  }
}
