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
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-[#2C3E50]">Appointments</h1>
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
