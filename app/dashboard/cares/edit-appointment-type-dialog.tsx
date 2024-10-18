'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
import { Switch } from '@/components/ui/switch';
import { updateAppointmentType } from '@/app/lib/actions/appointment-types';
import { useToast } from '@/hooks/use-toast';
import { getAppointmentTypePayload } from './helpers';
import { UpdateAppointmentTypePayload } from '@/src/application/repositories/appointment-types.repository.interface';

type AppointmentTypesPageProps = {
  duration: number;
  id: string;
  isOpen: boolean;
  name: string;
  price: number;
  sessionCount: number;
  onOpenChange: (open: boolean) => void;
  onDialogSubmit: (data: any) => void;
};

export function EditAppointmentTypeDialog({
  duration,
  id,
  isOpen,
  name,
  price,
  sessionCount,
  onOpenChange,
  onDialogSubmit,
}: AppointmentTypesPageProps) {
  const t = useTranslations('Cares');

  const { toast } = useToast();

  const [isPackage, setIsPackage] = useState(sessionCount > 1);

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    const newAppointmentType = {
      id,
      ...getAppointmentTypePayload(formData),
    } as UpdateAppointmentTypePayload;

    try {
      const { updatedAppointmentType } =
        await updateAppointmentType(newAppointmentType);
      onDialogSubmit(updatedAppointmentType);
    } catch (error) {
      console.error(error);
      toast({
        description: t('toast.editCare.error.description'),
        title: t('toast.editCare.error.title'),
        variant: 'destructive',
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('dialog.editCare.title')}</DialogTitle>
          <DialogDescription>
            {t('dialog.editCare.description')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                {t('name')}
              </Label>
              <Input
                id="edit-name"
                name="name"
                defaultValue={name}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-duration" className="text-right">
                {t('duration')}
              </Label>
              <Input
                id="edit-duration"
                name="duration"
                type="number"
                defaultValue={duration}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">
                {t('price')}
              </Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={price}
                className="col-span-3"
                required
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
              <Label htmlFor="edit-sessionCount" className="text-right">
                {t('sessions')}
              </Label>
              <Input
                id="edit-sessionCount"
                name="sessionCount"
                type="number"
                defaultValue={sessionCount}
                className="col-span-3"
                disabled={!isPackage}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
            >
              {t('dialog.editCare.submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
