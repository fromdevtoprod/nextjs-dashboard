import { useState } from 'react';
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
import { updateClient } from '@/app/lib/actions/customers';
import { useToast } from '@/hooks/use-toast';
import { updateCustomerController } from '@/src/interface-adapters/customers/update-customer.controller';
import { UpdateCustomerPayload } from '@/src/application/repositories/customers.repository.interface';

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
  const [emailOrPhoneError, setEmailOrPhoneError] = useState('');

  const { toast } = useToast();

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    let updateCustomerPayload;
    try {
      // @ts-ignore
      const formData = new FormData(event.target);
      updateCustomerPayload = updateCustomerController(id, formData);
    } catch (error: any) {
      setEmailOrPhoneError(error.message);
    }

    if (!updateCustomerPayload) {
      return;
    }

    try {
      await updateClient(updateCustomerPayload);
      onDialogSubmit(updateCustomerPayload);
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not update this client.',
        title: 'Sorry, something went wrong !',
        variant: 'destructive',
      });
    }
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
              {emailOrPhoneError && (
                <>
                  <div></div>
                  <p className="col-span-3 text-sm text-red-500">
                    {emailOrPhoneError}
                  </p>
                </>
              )}
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
