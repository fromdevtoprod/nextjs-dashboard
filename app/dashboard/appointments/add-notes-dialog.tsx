'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { addNotes } from '@/app/lib/actions/notes';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type AddAppointmentDialogProps = {
  appointmentId: string;
  isOpened: boolean;
  onDialogSubmit: () => void;
  onOpenChange: (isOpened: boolean) => void;
};

export function AddNotesDialog({
  appointmentId,
  isOpened,
  onDialogSubmit,
  onOpenChange,
}: AddAppointmentDialogProps) {
  const t = useTranslations('Notes');

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      // @ts-ignore
      const formData = new FormData(event.target);
      const content = formData.get('content') as string;
      const newAppointment = {
        appointment_id: appointmentId,
        content,
      };
      await addNotes(newAppointment);
      onDialogSubmit();
    } catch (error) {
      console.error(error);
      toast({
        description: t('toast.addNotes.error.description'),
        title: t('toast.addNotes.error.title'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpened} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('dialog.addNotes.title')}</DialogTitle>
          <DialogDescription>{t('dialog.addNotes.subtitle')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                {t('dialog.addNotes.label')}
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder={t('dialog.addNotes.placeholder')}
                required
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
              disabled={isLoading}
            >
              Add Notes
              <Check className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
