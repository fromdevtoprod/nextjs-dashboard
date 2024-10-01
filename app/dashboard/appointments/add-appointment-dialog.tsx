'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UpcomingAppointment } from '@/src/entities/models/appointment';
import { createAppointment } from '@/app/lib/actions/appointments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CustomersCombobox } from '@/components/customers-combobox';
import { Switch } from '@/components/ui/switch';
import { AppointmentTypesWithRemainingSessions } from '@/src/application/use-cases/appointment-types/find-appointment-types-with-remaining-sessions.use-case';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';

type AddAppointmentDialogProps = {
  appointmentTypes: AppointmentTypesWithRemainingSessions[];
  isOpened: boolean;
  onDialogSubmit: (createdAppointment: UpcomingAppointment) => void;
  onOpenChange: (isOpened: boolean) => void;
};

export function AddAppointmentDialog({
  appointmentTypes,
  isOpened,
  onDialogSubmit,
  onOpenChange,
}: AddAppointmentDialogProps) {
  const [isPackage, setIsPackage] = useState(false);
  const [clientId, setClientId] = useState('');
  const { toast } = useToast();

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    const appointment_type_id = formData.get('type') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const newAppointment = {
      appointment_type_id,
      customer_id: clientId,
      date,
      is_package: isPackage,
      package_id: isPackage ? searchPackageId(appointment_type_id) : null,
      time,
    };
    try {
      const { createdAppointment } = await createAppointment(newAppointment);
      onDialogSubmit(createdAppointment);
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not create this appointment.',
        title: 'Sorry, something went wrong !',
        variant: 'destructive',
      });
    }
  };

  const searchPackageId = (appointmentTypeId: string) => {
    const appointmentType = appointmentTypes.find(
      (type) => type.customerId === clientId,
    );
    if (!appointmentType) {
      return null;
    }
    const foundType = appointmentType.appointmentTypes.find(
      (type) => type.id === appointmentTypeId,
    );
    if (!foundType || !foundType.package_id) {
      return null;
    }
    return foundType.package_id;
  };

  const clientAppointmentTypes = appointmentTypes.find(
    (type) => type.customerId === clientId,
  );

  let filteredAppointmentTypes: SelectedAppointmentType[] = [];

  if (clientAppointmentTypes) {
    filteredAppointmentTypes = clientAppointmentTypes.appointmentTypes.filter(
      (type) => (isPackage ? type.session_count > 1 : type.session_count === 1),
    );
  }

  return (
    <Dialog open={isOpened} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#7C9885] text-white hover:bg-[#6A8A73]">
          <Plus className="mr-2 h-5 w-5" />
          Add Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Appointment</DialogTitle>
          <DialogDescription>
            Create a new appointment or use a package session.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client" className="text-right">
                Client
              </Label>
              <CustomersCombobox
                clients={appointmentTypes.map((type) => ({
                  id: type.customerId,
                  name: type.customerName,
                }))}
                onChangeClient={setClientId}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="package" className="text-right">
                Package
              </Label>
              <Switch
                id="package"
                name="package"
                checked={isPackage}
                onCheckedChange={setIsPackage}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select name="type" required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {filteredAppointmentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
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
              Add Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
