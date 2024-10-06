'use client';

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

type EditClientProps = {
  address: string;
  birthDate: string;
  city: string;
  email: string;
  id: string;
  isOpen: boolean;
  name: string;
  pathology: string;
  phone: string;
  postalCode: string;
  onDialogSubmit: (data: any) => void;
  onOpenChange: (isOpen: boolean) => void;
};

export function EditClientDialog({
  address,
  birthDate,
  city,
  email,
  id,
  isOpen,
  name,
  pathology,
  phone,
  postalCode,
  onDialogSubmit,
  onOpenChange,
}: EditClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailOrPhoneError, setEmailOrPhoneError] = useState('');

  const { toast } = useToast();

  const handleOpenChange = () => {
    setEmailOrPhoneError('');
    onOpenChange(!isOpen);
  };

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    let updateCustomerPayload;
    try {
      setIsLoading(true);
      // @ts-ignore
      const formData = new FormData(event.target);
      updateCustomerPayload = updateCustomerController(id, formData);
    } catch (error: any) {
      setEmailOrPhoneError(error.message);
      setIsLoading(false);
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
                Birth Date
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
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                type="text"
                className="col-span-3"
                placeholder="1234 Main Street"
                defaultValue={address}
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
                defaultValue={postalCode}
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
                defaultValue={city}
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
              disabled={isLoading}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
