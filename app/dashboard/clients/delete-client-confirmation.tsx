import { Trash2 } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { deleteClient } from '@/app/lib/actions/customers';
import { useToast } from '@/hooks/use-toast';

type DeleteClientConfirmationProps = {
  clientId: string;
  whenDeleteDone: () => void;
};

export function DeleteClientConfirmation({
  clientId,
  whenDeleteDone,
}: DeleteClientConfirmationProps) {
  const { toast } = useToast();

  const handleDeleteClient = async () => {
    try {
      await deleteClient(clientId);
      whenDeleteDone();
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not delete this client.',
        title: 'Sorry, something went wrong !',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            client.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteClient}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
