'use client';

import { useEffect, useState } from 'react';
import { AppointmentsHeader } from './appointments-header';
import { AppointmentsCalendar } from './appointments-calendar';
import { AppointmentList } from './appointment-list';
import { UpcomingAppointment } from '@/src/entities/models/appointment';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';

type AppointmentsContainerProps = {
  appointmentTypes: SelectedAppointmentType[];
  clients: SelectedCustomer[];
  initialAppointments: UpcomingAppointment[];
};

export function AppointmentsContainer({
  appointmentTypes,
  clients,
  initialAppointments,
}: AppointmentsContainerProps) {
  const [upcomingAppointments, setUpcomingAppointments] =
    useState<UpcomingAppointment[]>(initialAppointments);

  const handleAddAppointment = (createdAppointment: UpcomingAppointment) => {
    setUpcomingAppointments((prevAppointments) => [
      ...prevAppointments,
      createdAppointment,
    ]);
  };

  useEffect(() => {
    setUpcomingAppointments(initialAppointments);
  });

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <AppointmentsHeader
        appointmentTypes={appointmentTypes}
        clients={clients}
        onAddAppointment={handleAddAppointment}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <AppointmentsCalendar />
        <AppointmentList appointments={upcomingAppointments} />
      </div>
    </main>
  );
}
