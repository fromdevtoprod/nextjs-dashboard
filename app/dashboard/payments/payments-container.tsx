'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { SelectedPayment } from '@/src/entities/models/payment';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { AddPaymentDialog } from './add-payment-dialog';
import { PaymentList } from './payment-list';
import { EditPaymentDialog } from './edit-payment-dialog';

type PaymentsContainerProps = {
  initialPayments: SelectedPayment[];
};

export function PaymentsContainer({ initialPayments }: PaymentsContainerProps) {
  const [payments, setPayments] = useState<SelectedPayment[]>(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPayment, setEditingPayment] = useState<SelectedPayment | null>(
    null,
  );
  const [isAddingPayment, setIsAddingPayment] = useState(false);

  const filteredPayments = payments.filter(
    (payment) =>
      payment.amount
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.appointment_type_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddPayment = (newPayment: SelectedPayment) => {
    setPayments([...payments, { ...newPayment }]);
    setIsAddingPayment(false);
  };

  const handleUpdatePayment = (updatedPayment: SelectedPayment) => {
    setPayments(
      payments.map((payment) =>
        payment.id === updatedPayment.id ? updatedPayment : payment,
      ),
    );
    setEditingPayment(null);
  };

  const handleDeletePayment = (paymentId: string) => {
    setPayments(payments.filter((payment) => payment.id !== paymentId));
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="mb-4 pl-12 text-2xl font-bold text-[#2C3E50] md:mb-0 md:pl-0 md:text-3xl">
            Payments
          </h1>
          {/* <AddPaymentDialog
            isOpen={isAddingPayment}
            onDialogSubmit={handleAddPayment}
            onOpenChange={setIsAddingPayment}
          /> */}
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Search className="text-[#7C9885]" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        <PaymentList
          filteredPayments={filteredPayments}
          onDeleteClick={handleDeletePayment}
          onEditClick={setEditingPayment}
        />
      </main>

      <EditPaymentDialog
        amount={editingPayment?.amount || 0}
        date={editingPayment?.date || ''}
        id={editingPayment?.id || ''}
        isOpen={!!editingPayment}
        method={editingPayment?.method || ''}
        packageId={editingPayment?.package_id || ''}
        status={editingPayment?.status || ''}
        onDialogSubmit={handleUpdatePayment}
        onOpenChange={() => setEditingPayment(null)}
      />

      <Toaster />
    </>
  );
}
