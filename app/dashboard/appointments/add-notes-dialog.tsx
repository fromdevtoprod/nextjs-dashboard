'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { addNotes } from '@/app/lib/actions/notes';
import { Textarea } from '@/components/ui/textarea';

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
  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    const content = formData.get('content') as string;
    const newAppointment = {
      appointment_id: appointmentId,
      content,
    };
    await addNotes(newAppointment);
    onDialogSubmit();
  };

  return (
    <Dialog open={isOpened} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Notes</DialogTitle>
          <DialogDescription>Notes for this appointment.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Enter notes here"
                required
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
            >
              Add Notes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
