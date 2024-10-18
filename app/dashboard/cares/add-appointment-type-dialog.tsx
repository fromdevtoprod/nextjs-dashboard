'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, FileHeart } from 'lucide-react';
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
import { AppointmentType } from '@/src/entities/models/appointment-types';
import { createAppointmentType } from '@/app/lib/actions/appointment-types';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { getAppointmentTypePayload } from './helpers';

type AppointmentTypesPageProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDialogSubmit: (newAppointmentType: AppointmentType) => void;
};

export function AddAppointmentTypeDialog({
  isOpen,
  onOpenChange,
  onDialogSubmit,
}: AppointmentTypesPageProps) {
  const t = useTranslations('Cares');

  const { toast } = useToast();

  const [isPackage, setIsPackage] = useState(false);

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    const newAppointmentType = getAppointmentTypePayload(formData);

    try {
      const { createdAppointmentType } =
        await createAppointmentType(newAppointmentType);
      onDialogSubmit(createdAppointmentType);
    } catch (error) {
      console.error(error);
      toast({
        description: t('toast.addCare.error.description'),
        title: t('toast.addCare.error.title'),
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#7C9885] text-white hover:bg-[#6A8A73]">
          <FileHeart className="mr-2 h-5 w-5" />
          {t('addCare')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('dialog.addCare.title')}</DialogTitle>
          <DialogDescription>
            {t('dialog.addCare.description')}
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
                placeholder={t('dialog.addCare.name.placeholder')}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                {t('duration')}
              </Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                className="col-span-3"
                placeholder={t('dialog.addCare.duration.placeholder')}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                {t('price')}
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                className="col-span-3"
                placeholder={t('dialog.addCare.price.placeholder')}
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
              <Label htmlFor="sessionCount" className="text-right">
                {t('sessions')}
              </Label>
              <Input
                id="sessionCount"
                name="sessionCount"
                type="number"
                className="col-span-3"
                defaultValue={1}
                required
                disabled={!isPackage}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
            >
              {t('dialog.addCare.submit')}
              <Check className="ml-2 h-5 w-5" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
