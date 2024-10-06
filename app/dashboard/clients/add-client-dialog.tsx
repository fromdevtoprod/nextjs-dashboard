'use client';

import { useState } from 'react';
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
import { updateCustomerController } from '@/src/interface-adapters/customers/update-customer.controller';

type AddClientDialogProps = {
  isOpen: boolean;
  onDialogSubmit: (createdClient: SelectedCustomer) => void;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddClientDialog({
  isOpen,
  onDialogSubmit,
  onOpenChange,
}: AddClientDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailOrPhoneError, setEmailOrPhoneError] = useState('');

  const { toast } = useToast();

  const handleOpenChange = () => {
    setIsLoading(false);
    setEmailOrPhoneError('');
    onOpenChange(!isOpen);
  };

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    let newClientPayload;
    try {
      setIsLoading(true);
      // @ts-ignore
      const formData = new FormData(event.target);
      newClientPayload = updateCustomerController('', formData);
    } catch (error: any) {
      setEmailOrPhoneError(error.message);
      setIsLoading(false);
    }

    if (!newClientPayload) {
      return;
    }

    try {
      const { createdClient } = await createClient({
        address: newClientPayload.address,
        birthDate: newClientPayload.birthDate,
        city: newClientPayload.city,
        email: newClientPayload.email,
        name: newClientPayload.name,
        pathology: newClientPayload.pathology,
        phone: newClientPayload.phone,
        postalCode: newClientPayload.postalCode,
      });
      onDialogSubmit(createdClient);
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not add this client.',
        title: 'Sorry, something went wrong !',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
              <Input
                id="name"
                name="name"
                className="col-span-3"
                required={true}
                placeholder="M. John Doe"
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
                className="col-span-3"
                placeholder="email@company.com"
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
                placeholder="+1 123 456 7890"
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
                Birth Date
              </Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                className="col-span-3"
                required={true}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                type="text"
                className="col-span-3"
                placeholder="1234 Main Street"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="postalCode" className="text-right">
                Postal Code
              </Label>
              <Input
                id="postalCode"
                name="postalCode"
                type="text"
                className="col-span-3"
                placeholder="12345"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input
                id="city"
                name="city"
                type="text"
                className="col-span-3"
                placeholder="City"
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
              disabled={isLoading}
            >
              Add Client
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
