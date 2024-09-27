'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { UpcomingAppointment } from '@/src/entities/models/appointment';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { SelectedCustomer } from '@/src/entities/models/customer';
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
import { getPostRequest } from './helpers';

type AddAppointmentDialogProps = {
  initialAppointmentTypes: SelectedAppointmentType[];
  clients: SelectedCustomer[];
  isOpened: boolean;
  onDialogSubmit: (createdAppointment: UpcomingAppointment) => void;
  onOpenChange: (isOpened: boolean) => void;
};

export function AddAppointmentDialog({
  initialAppointmentTypes,
  clients,
  isOpened,
  onDialogSubmit,
  onOpenChange,
}: AddAppointmentDialogProps) {
  const [isPackage, setIsPackage] = useState(false);
  const [clientId, setClientId] = useState('');

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
      client_id: clientId,
      date,
      time,
    };
    const { createdAppointment } = await getPostRequest(newAppointment);
    onDialogSubmit(createdAppointment);
  };

  const appointmentTypes = initialAppointmentTypes.filter((type) =>
    isPackage ? type.session_count > 1 : type.session_count === 1,
  );

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
                clients={clients}
                onChangeClient={setClientId}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="package" className="text-right">
                Package
              </Label>
              <Switch
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
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name + (type.session_count > 1 ? ' (Package)' : '')}
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
