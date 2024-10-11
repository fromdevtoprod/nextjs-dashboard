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
import { deleteClient } from '@/app/lib/actions/customers';
import { useToast } from '@/hooks/use-toast';
import { DeleteButton } from '@/app/ui/buttons/delete-button';

type DeleteClientConfirmationProps = {
  clientId: string;
  whenDeleteDone: () => void;
};

export function DeleteClientConfirmation({
  clientId,
  whenDeleteDone,
}: DeleteClientConfirmationProps) {
  const t = useTranslations('Clients');

  const { toast } = useToast();

  const handleDeleteClient = async () => {
    try {
      await deleteClient(clientId);
      whenDeleteDone();
    } catch (error) {
      console.error(error);
      toast({
        description: t('toast.removeClient.error.description'),
        title: t('toast.removeClient.error.title'),
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
          <AlertDialogTitle>{t('dialog.removeClient.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('dialog.removeClient.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteClient}>
            {t('continue')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
