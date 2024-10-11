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
import { useTranslations } from 'next-intl';

type DeleteClientConfirmationProps = {
  careId: string;
  whenDeleteDone: () => void;
};

export function DeleteAppointmentTypeConfirmation({
  careId,
  whenDeleteDone,
}: DeleteClientConfirmationProps) {
  const t = useTranslations('Cares');

  const { toast } = useToast();

  const handleDeleteAppointmentType = async () => {
    try {
      await deleteAppointmentType(careId);
      whenDeleteDone();
    } catch (error) {
      console.error(error);
      toast({
        description: t('toast.removeCare.error.description'),
        title: t('toast.removeCare.error.title'),
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
          <AlertDialogTitle>{t('dialog.removeCare.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('dialog.removeCare.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAppointmentType}>
            {t('continue')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
