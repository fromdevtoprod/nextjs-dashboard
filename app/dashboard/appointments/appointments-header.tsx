'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Appointment } from '@/src/entities/models/appointment';
import { AppointmentTypesWithRemainingSessions } from '@/src/application/use-cases/appointment-types/find-appointment-types-with-remaining-sessions.use-case';
import { AddAppointmentDialog } from './add-appointment-dialog';

type AppointmentsHeaderProps = {
  appointmentTypes: AppointmentTypesWithRemainingSessions[];
  onAddAppointment: (createdAppointment: Appointment) => void;
};

export function AppointmentsHeader({
  appointmentTypes,
  onAddAppointment,
}: AppointmentsHeaderProps) {
  const t = useTranslations('Appointments');
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const handleDialogSubmit = (createdAppointment: Appointment) => {
    onAddAppointment(createdAppointment);
    setIsAddingAppointment(false);
  };
  return (
    <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
      <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
        {t('appointments')}
      </h1>
      <AddAppointmentDialog
        appointmentTypes={appointmentTypes}
        isOpened={isAddingAppointment}
        onOpenChange={setIsAddingAppointment}
        onDialogSubmit={handleDialogSubmit}
      />
    </div>
  );
}
