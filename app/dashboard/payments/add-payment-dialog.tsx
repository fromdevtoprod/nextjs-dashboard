'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SelectedPayment } from '@/src/entities/models/payment';
import { useToast } from '@/hooks/use-toast';
import { updatePaymentController } from '@/src/interface-adapters/payments/update-payment.controller';
import { createPayment } from '@/app/lib/actions/payments';

// Mock data for appointments and packages
const appointments = [
  { id: 1, description: 'Therapy Session with Dr. Smith', amount: 150 },
  { id: 2, description: 'Follow-up with Dr. Johnson', amount: 100 },
  { id: 3, description: 'Initial Consultation with Dr. Brown', amount: 200 },
];

const packages = [
  { id: 1, description: '5 Therapy Sessions Package', amount: 700 },
  { id: 2, description: '10 Wellness Checks Package', amount: 1200 },
  { id: 3, description: '3 Consultation Package', amount: 500 },
];

type AddPaymentDialogProps = {
  isOpen: boolean;
  onDialogSubmit: (createdPayment: SelectedPayment) => void;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddPaymentDialog({
  isOpen,
  onDialogSubmit,
  onOpenChange,
}: AddPaymentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState('');
  const { toast } = useToast();

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    let newPaymentPayload;
    try {
      setIsLoading(true);
      // @ts-ignore
      const formData = new FormData(event.target);
      newPaymentPayload = updatePaymentController('', formData);
    } catch (error: any) {
      setFieldError('Please fill in all the fields.');
    } finally {
      setIsLoading(false);
    }

    if (!newPaymentPayload) {
      return;
    }

    try {
      const { createdPayment } = await createPayment({
        amount: newPaymentPayload.amount,
        appointmentId: newPaymentPayload.appointmentId,
        customerId: newPaymentPayload.customerId,
        date: newPaymentPayload.date,
        method: newPaymentPayload.method,
        packageId: newPaymentPayload.packageId,
        status: newPaymentPayload.status,
      });
      onDialogSubmit(createdPayment);
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not add this payment.',
        title: 'Sorry, something went wrong !',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#7C9885] text-white hover:bg-[#6A8A73]">
          <Plus className="mr-2 h-5 w-5" />
          Add Payment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Payment</DialogTitle>
          <DialogDescription>
            Enter the details for the new payment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select name="type" required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Appointment">Appointment</SelectItem>
                  <SelectItem value="Package">Package</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Select name="description" required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appointment">
                    {appointments.map((apt) => (
                      <SelectItem key={apt.id} value={apt.description}>
                        {apt.description} - ${apt.amount}
                      </SelectItem>
                    ))}
                  </SelectItem>
                  <SelectItem value="package">
                    {packages.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.description}>
                        {pkg.description} - ${pkg.amount}
                      </SelectItem>
                    ))}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                required
                className="col-span-3"
              />
            </div>
          </div>
          {fieldError && (
            <>
              <div></div>
              <p className="col-span-3 text-sm text-red-500">{fieldError}</p>
            </>
          )}
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
              disabled={isLoading}
            >
              Add Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
