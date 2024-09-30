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
import { SelectedCustomer } from '@/src/entities/models/customer';
import { createClient } from '@/app/lib/actions/customers';
import { useToast } from '@/hooks/use-toast';
import { getClientPayload } from './helpers';

type AddClientDialogProps = {
  isOpen: boolean;
  onDialogSubmit: (createdClient: SelectedCustomer) => void;
  onOpenChange: (open: boolean) => void;
};

export function AddClientDialog({
  isOpen,
  onDialogSubmit,
  onOpenChange,
}: AddClientDialogProps) {
  const { toast } = useToast();

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    const newClientPayload = getClientPayload(formData);

    try {
      const { createdClient } = await createClient(newClientPayload);
      onDialogSubmit(createdClient);
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not add this client.',
        title: 'Sorry, something went wrong !',
        variant: 'destructive',
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#7C9885] text-white hover:bg-[#6A8A73]">
          <Plus className="mr-2 h-5 w-5" />
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Enter the details for the new client here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
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
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pathology" className="text-right">
                Pathology
              </Label>
              <Input id="pathology" name="pathology" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
            >
              Add Client
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
