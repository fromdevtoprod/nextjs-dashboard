import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { DeleteButton } from '@/app/ui/buttons/delete-button';

type DeletePaymentConfirmationProps = {
  paymentId: string;
  whenDeleteDone: () => void;
};

export function DeletePaymentConfirmation({
  paymentId,
  whenDeleteDone,
}: DeletePaymentConfirmationProps) {
  const { toast } = useToast();

  const handleDeletePayment = async () => {
    try {
      // await deleteClient(paymentId);
      whenDeleteDone();
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not delete this payment.',
        title: 'Sorry, something went wrong !',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DeleteButton />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            payment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletePayment}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
