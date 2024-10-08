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
import { deleteAppointment } from '@/app/lib/actions/appointments';

type DeleteAppointmentConfirmationProps = {
  appointmentId: string;
  whenDeleteDone: () => void;
};

export function DeleteAppointmentConfirmation({
  appointmentId,
  whenDeleteDone,
}: DeleteAppointmentConfirmationProps) {
  const { toast } = useToast();

  const handleDeleteAppointment = async () => {
    try {
      await deleteAppointment(appointmentId);
      whenDeleteDone();
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not delete this appointment.',
        title: 'Sorry, something went wrong !',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DeleteButton isLabelDisplayed={false} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            appointment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAppointment}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
