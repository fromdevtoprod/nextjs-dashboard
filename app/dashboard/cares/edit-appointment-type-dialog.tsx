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
} from '@/components/ui/dialog';
import { getAppointmentTypePayload } from './helpers';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { updateAppointmentType } from '@/app/lib/actions/appointment-types';

type AppointmentTypesPageProps = {
  duration: number;
  id: string;
  isOpen: boolean;
  name: string;
  price: number;
  sessionCount: number;
  onOpenChange: (open: boolean) => void;
  onDialogSubmit: (data: any) => void;
};

export function EditAppointmentTypeDialog({
  duration,
  id,
  isOpen,
  name,
  price,
  sessionCount,
  onOpenChange,
  onDialogSubmit,
}: AppointmentTypesPageProps) {
  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    const updatedAppointmentType = {
      id,
      ...getAppointmentTypePayload(formData),
    } as SelectedAppointmentType;
    await updateAppointmentType(updatedAppointmentType);
    onDialogSubmit(updatedAppointmentType);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Appointment Type</DialogTitle>
          <DialogDescription>
            Make changes to the appointment type or package here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                defaultValue={name}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-duration" className="text-right">
                Duration (minutes)
              </Label>
              <Input
                id="edit-duration"
                name="duration"
                type="number"
                defaultValue={duration}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">
                Price ($)
              </Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={price}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-sessionCount" className="text-right">
                Sessions in Package
              </Label>
              <Input
                id="edit-sessionCount"
                name="sessionCount"
                type="number"
                defaultValue={sessionCount}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
