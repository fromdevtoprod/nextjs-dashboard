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
import { getAppointmentTypePayload, getPostRequest } from './helpers';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';

type AppointmentTypesPageProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDialogSubmit: (newAppointmentType: SelectedAppointmentType) => void;
};

export function AddAppointmentTypeDialog({
  isOpen,
  onOpenChange,
  onDialogSubmit,
}: AppointmentTypesPageProps) {
  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    const newAppointmentType = getAppointmentTypePayload(formData);
    await getPostRequest(newAppointmentType);
    onDialogSubmit(newAppointmentType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#7C9885] text-white hover:bg-[#6A8A73]">
          <Plus className="mr-2 h-5 w-5" />
          Add Care
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Care</DialogTitle>
          <DialogDescription>
            Create a new care for your schedule.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration (minutes)
              </Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                className="col-span-3"
                defaultValue={60}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price ($)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sessionCount" className="text-right">
                Sessions in Package
              </Label>
              <Input
                id="sessionCount"
                name="sessionCount"
                type="number"
                className="col-span-3"
                defaultValue={1}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
            >
              Add Type
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
