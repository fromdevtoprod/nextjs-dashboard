'use client';

import { useState } from 'react';
import { AddAppointmentDialog } from './add-appointment-dialog';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { UpcomingAppointment } from '@/src/entities/models/appointment';

type AppointmentsHeaderProps = {
  appointmentTypes: SelectedAppointmentType[];
  clients: SelectedCustomer[];
  onAddAppointment: (createdAppointment: UpcomingAppointment) => void;
};

export function AppointmentsHeader({
  appointmentTypes,
  clients,
  onAddAppointment,
}: AppointmentsHeaderProps) {
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const handleDialogSubmit = (createdAppointment: UpcomingAppointment) => {
    onAddAppointment(createdAppointment);
    setIsAddingAppointment(false);
  };
  return (
    <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
      <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
        Appointments
      </h1>
      <AddAppointmentDialog
        initialAppointmentTypes={appointmentTypes}
        clients={clients}
        isOpened={isAddingAppointment}
        onOpenChange={setIsAddingAppointment}
        onDialogSubmit={handleDialogSubmit}
      />
    </div>
  );
}
