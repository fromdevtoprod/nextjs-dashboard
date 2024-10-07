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
import { deleteAppointmentType } from '@/app/lib/actions/appointment-types';

type DeleteClientConfirmationProps = {
  careId: string;
  whenDeleteDone: () => void;
};

export function DeleteAppointmentTypeConfirmation({
  careId,
  whenDeleteDone,
}: DeleteClientConfirmationProps) {
  const { toast } = useToast();

  const handleDeleteAppointmentType = async () => {
    try {
      await deleteAppointmentType(careId);
      whenDeleteDone();
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not delete this care.',
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
            care.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAppointmentType}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
