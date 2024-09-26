'use client';

import { Plus } from 'lucide-react';
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
import { SelectedCustomer } from '@/src/entities/models/customer';
import { getPostRequest } from './helpers';
import {
  CreatedPackage,
  SelectedPackage,
} from '@/src/entities/models/package-model';

type StartPackageDialogProps = {
  customers: SelectedCustomer[];
  isOpen: boolean;
  packageTypes: any[];
  onOpenChange: (open: boolean) => void;
  onDialogSubmit: (newPackage: SelectedPackage) => void;
};

export function StartPackageDialog({
  customers,
  isOpen,
  packageTypes,
  onOpenChange,
  onDialogSubmit,
}: StartPackageDialogProps) {
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
    } as CreatedPackage;
    const { createdPackage } = await getPostRequest(newPackage);
    onDialogSubmit(createdPackage);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#7C9885] text-white hover:bg-[#6A8A73]">
          <Plus className="mr-2 h-5 w-5" />
          Start New Package
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start New Package</DialogTitle>
          <DialogDescription>
            Select a customer and package type to start a new package.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerId" className="text-right">
                Customer
              </Label>
              <Select name="customerId" required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="packageId" className="text-right">
                Package Type
              </Label>
              <Select name="packageId" required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
                <SelectContent>
                  {packageTypes.map((packageType) => (
                    <SelectItem key={packageType.name} value={packageType.id}>
                      {packageType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
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
              Start Package
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
