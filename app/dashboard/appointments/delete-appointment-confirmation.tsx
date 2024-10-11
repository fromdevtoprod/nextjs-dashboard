import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Appointments');

  const { toast } = useToast();

  const handleDeleteAppointment = async () => {
    try {
      await deleteAppointment(appointmentId);
      whenDeleteDone();
    } catch (error) {
      console.error(error);
      toast({
        description: t('toast.removeAppointment.error.description'),
        title: t('toast.removeAppointment.error.title'),
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
          <AlertDialogTitle>
            {t('dialog.removeAppointment.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('dialog.removeAppointment.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAppointment}>
            {t('continue')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
