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
import { getClientPayload, getPutRequest } from './helpers';
import { SelectedCustomer } from '@/src/entities/models/customer';

type EditClientProps = {
  birthDate: string;
  email: string;
  id: string;
  isOpen: boolean;
  name: string;
  pathology: string;
  phone: string;
  onDialogSubmit: (data: any) => void;
  onOpenChange: () => void;
};

export function EditClientDialog({
  birthDate,
  email,
  id,
  isOpen,
  name,
  pathology,
  phone,
  onDialogSubmit,
  onOpenChange,
}: EditClientProps) {
  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    const updatedClient = {
      id,
      ...getClientPayload(formData),
    } as SelectedCustomer;
    await getPutRequest(updatedClient);
    onDialogSubmit(updatedClient);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogDescription>
            Make changes to the client information here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={email}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={phone}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthDate" className="text-right">
                Birth date
              </Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                defaultValue={birthDate}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pathology" className="text-right">
                Pathology
              </Label>
              <Input
                id="pathology"
                name="pathology"
                defaultValue={pathology}
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
