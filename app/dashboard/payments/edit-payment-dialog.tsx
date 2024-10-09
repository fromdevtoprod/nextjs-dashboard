'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { updatePayment } from '@/app/lib/actions/payments';
import { updatePaymentController } from '@/src/interface-adapters/payments/update-payment.controller';

type EditPaymentDialogProps = {
  amount: number;
  date: string;
  id: string;
  isOpen: boolean;
  method: string;
  packageId: string;
  status: string;
  onDialogSubmit: (data: any) => void;
  onOpenChange: () => void;
};

export function EditPaymentDialog({
  id,
  isOpen,
  method,
  status,
  onDialogSubmit,
  onOpenChange,
}: EditPaymentDialogProps) {
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
      newPaymentPayload = updatePaymentController(id, formData);
    } catch (error: any) {
      setFieldError('Please fill in all the fields.');
    } finally {
      setIsLoading(false);
    }

    if (!newPaymentPayload) {
      return;
    }

    try {
      setIsLoading(true);
      const { updatedPayment } = await updatePayment({
        id: newPaymentPayload.id,
        method: newPaymentPayload.method,
        status: newPaymentPayload.status,
      });
      onDialogSubmit(updatedPayment);
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not update this payment.',
        title: 'Sorry, something went wrong !',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Payment</DialogTitle>
          <DialogDescription>
            Update the details of the payment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="method" className="text-right">
                Method
              </Label>
              <Select name="method" defaultValue={method} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Payment
              </Label>
              <Select name="status" defaultValue={status} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
