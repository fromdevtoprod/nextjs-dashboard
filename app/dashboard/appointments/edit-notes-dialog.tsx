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
import { updateNotes } from '@/app/lib/actions/notes';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Notes } from '@/src/entities/models/notes';

type EditNotesDialogProps = {
  notesId: string;
  isOpened: boolean;
  notes: string;
  onDialogSubmit: (updatedNotes: Notes) => void;
  onOpenChange: (isOpened: boolean) => void;
};

export function EditNotesDialog({
  notesId,
  isOpened,
  notes,
  onDialogSubmit,
  onOpenChange,
}: EditNotesDialogProps) {
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
      const updateNotesPayload = {
        id: notesId,
        content,
      };
      const { updatedNotes } = await updateNotes(updateNotesPayload);
      onDialogSubmit(updatedNotes);
    } catch (error) {
      console.error(error);
      toast({
        description: t('toast.editNotes.error.description'),
        title: t('toast.editNotes.error.title'),
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
          <DialogTitle>{t('dialog.editNotes.title')}</DialogTitle>
          <DialogDescription>
            {t('dialog.editNotes.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                {t('dialog.editNotes.label')}
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder={t('dialog.editNotes.placeholder')}
                className="col-span-3"
                defaultValue={notes}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
              disabled={isLoading}
            >
              {t('dialog.editNotes.submit')}
              <Check className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
