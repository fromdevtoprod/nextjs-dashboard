'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, UserRoundPlus } from 'lucide-react';
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
import { Customer } from '@/src/entities/models/customer';
import { createClient } from '@/app/lib/actions/customers';
import { useToast } from '@/hooks/use-toast';
import { updateCustomerController } from '@/src/interface-adapters/customers/update-customer.controller';
import { auth } from '@/auth';

type AddClientDialogProps = {
  isOpen: boolean;
  userEmail: string;
  onDialogSubmit: (createdClient: Customer) => void;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddClientDialog({
  isOpen,
  userEmail,
  onDialogSubmit,
  onOpenChange,
}: AddClientDialogProps) {
  const t = useTranslations('Clients');

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
      const { createdClient } = await createClient(
        {
          address: newClientPayload.address,
          birthDate: newClientPayload.birthDate,
          city: newClientPayload.city,
          email: newClientPayload.email,
          name: newClientPayload.name,
          pathology: newClientPayload.pathology,
          phone: newClientPayload.phone,
          postalCode: newClientPayload.postalCode,
        },
        userEmail,
      );
      onDialogSubmit(createdClient);
    } catch (error) {
      console.error(error);
      toast({
        description: t('toast.addClient.error.description'),
        title: t('toast.addClient.error.title'),
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
          <UserRoundPlus className="mr-2 h-4 w-4" />
          {t('addClient')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('dialog.addClient.title')}</DialogTitle>
          <DialogDescription>
            {t('dialog.addClient.description')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t('name')}
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
                {t('email')}
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
                {t('phone')}
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
                {t('birthDate')}
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
                {t('address')}
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
                {t('postalCode')}
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
                {t('city')}
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
                {t('pathology')}
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
              {t('dialog.addClient.submit')}
              <Check className="ml-2 h-5 w-5" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
