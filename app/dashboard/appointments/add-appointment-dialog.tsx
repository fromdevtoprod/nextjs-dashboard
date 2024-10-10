'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CalendarPlus, Check } from 'lucide-react';
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
import { createAppointmentController } from '@/src/interface-adapters/appointments/create-appointment.controller';
import { SelectPaymentMethod } from '@/app/ui/selects/select-payment-method';
import { SelectPaymentStatus } from '@/app/ui/selects/select-payment-status';

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
  const t = useTranslations('Appointments');

  const [isPackage, setIsPackage] = useState(false);
  const [clientId, setClientId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState('');
  const { toast } = useToast();

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    let createAppointmentPayload;

    try {
      // @ts-ignore
      const formData = new FormData(event.target);
      createAppointmentPayload = createAppointmentController({
        appointmentTypes,
        customerId: clientId,
        isPackage,
        formData,
      });
    } catch (error: any) {
      console.error(error);
      setFieldError(error.message);
    } finally {
      setIsLoading(false);
    }

    if (!createAppointmentPayload) {
      return;
    }

    try {
      setIsLoading(true);
      const { createdAppointment } = await createAppointment(
        createAppointmentPayload,
      );
      onDialogSubmit(createdAppointment);
    } catch (error) {
      console.error(error);
      toast({
        description: t('toast.addAppointment.error.description'),
        title: t('toast.addAppointment.error.title'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
          <CalendarPlus className="mr-2 h-5 w-5" />
          {t('addAppointment')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('dialog.addAppointment.title')}</DialogTitle>
          <DialogDescription>
            {t('dialog.addAppointment.description')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client" className="text-right">
                {t('client')}
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
                {t('package')}
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
                {t('type')}
              </Label>
              <Select name="type" required>
                <SelectTrigger className="col-span-3">
                  <SelectValue
                    placeholder={t(
                      'dialog.addAppointment.select.type.placeholder',
                    )}
                  />
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
                {t('date')}
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
                {t('time')}
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <SelectPaymentStatus />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <SelectPaymentMethod />
            </div>
            {fieldError && (
              <>
                <div></div>
                <p className="col-span-3 text-sm text-red-500">{fieldError}</p>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
              disabled={isLoading}
            >
              {t('dialog.addAppointment.submitButton')}
              <Check className="ml-2 h-5 w-5" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
