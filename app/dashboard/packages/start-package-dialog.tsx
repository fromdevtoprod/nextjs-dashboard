'use client';

import { useTranslations } from 'next-intl';
import { Check, Package as PackageIcon, PackagePlus, User } from 'lucide-react';
import { Customer } from '@/src/entities/models/customer';
import { Package } from '@/src/entities/models/package-model';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { startPackage } from '@/app/lib/actions/packages';
import { useToast } from '@/hooks/use-toast';
import { CreatePackagePayload } from '@/src/application/repositories/packages.repository.interface';

type StartPackageDialogProps = {
  customers: Customer[];
  isOpen: boolean;
  packageTypes: any[];
  userEmail: string;
  onOpenChange: (open: boolean) => void;
  onDialogSubmit: (newPackage: Package) => void;
};

export function StartPackageDialog({
  customers,
  isOpen,
  packageTypes,
  userEmail,
  onOpenChange,
  onDialogSubmit,
}: StartPackageDialogProps) {
  const t = useTranslations('Packages');

  const { toast } = useToast();

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    const appointment_type_id = formData.get('packageId');
    const customer_id = formData.get('customerId');
    const packageType = packageTypes.find(
      (pt) => pt.id === appointment_type_id,
    );
    const start_date = formData.get('startDate');
    const newPackage = {
      appointment_type_id,
      customer_id,
      remaining_sessions: packageType.session_count,
      start_date,
      // expiryDate: expiryDate.toISOString().split('T')[0],
    } as CreatePackagePayload;

    try {
      const { createdPackage } = await startPackage(newPackage, userEmail);
      onDialogSubmit(createdPackage);
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not start this package.',
        title: 'Sorry, something went wrong !',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
          disabled={customers.length === 0 || packageTypes.length === 0}
        >
          <PackagePlus className="mr-2 h-5 w-5" />
          {t('startNewPackage')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('dialog.startNewPackage.title')}</DialogTitle>
          <DialogDescription>
            {t('dialog.startNewPackage.description')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerId" className="text-right">
                {t('client')}
              </Label>
              <Select name="customerId" required>
                <SelectTrigger className="col-span-3">
                  <SelectValue
                    placeholder={t('dialog.startNewPackage.client.placeholder')}
                  />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        {customer.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="packageId" className="text-right">
                {t('package')}
              </Label>
              <Select name="packageId" required>
                <SelectTrigger className="col-span-3">
                  <SelectValue
                    placeholder={t(
                      'dialog.startNewPackage.package.placeholder',
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  {packageTypes.map((packageType) => (
                    <SelectItem key={packageType.name} value={packageType.id}>
                      <div className="flex items-center">
                        <PackageIcon className="mr-2 h-4 w-4" />
                        {packageType.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                {t('startDate')}
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
            >
              {t('dialog.startNewPackage.submit')}
              <Check className="ml-2 h-5 w-5" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
