'use client';

import { useEffect, useState } from 'react';
import { AppointmentsHeader } from './appointments-header';
import { AppointmentsCalendar } from './appointments-calendar';
import { AppointmentList } from './appointment-list';
import { UpcomingAppointment } from '@/src/entities/models/appointment';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';

type AppointmentsContainerProps = {
  activeDay: number;
  activeMonth: number;
  activeYear: number;
  appointmentTypes: SelectedAppointmentType[];
  clients: SelectedCustomer[];
  initialAppointments: UpcomingAppointment[];
};

export function AppointmentsContainer({
  activeDay,
  activeMonth,
  activeYear,
  appointmentTypes,
  clients,
  initialAppointments,
}: AppointmentsContainerProps) {
  const [upcomingAppointments, setUpcomingAppointments] =
    useState<UpcomingAppointment[]>(initialAppointments);

  const handleAddAppointment = (createdAppointment: UpcomingAppointment) => {
    const date = new Date(createdAppointment.date);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    if (month === activeMonth && day === activeDay && year === activeYear) {
      setUpcomingAppointments((prevAppointments) => [
        ...prevAppointments,
        createdAppointment,
      ]);
    }
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    setUpcomingAppointments((prevAppointments) =>
      prevAppointments.filter(
        (appointment) => appointment.id !== appointmentId,
      ),
    );
  };

  useEffect(() => {
    if (initialAppointments) {
      setUpcomingAppointments(initialAppointments);
    }
  }, [initialAppointments]);

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <AppointmentsHeader
        appointmentTypes={appointmentTypes}
        clients={clients}
        onAddAppointment={handleAddAppointment}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <AppointmentsCalendar />
        <AppointmentList
          appointments={upcomingAppointments}
          whenDeleteDone={handleDeleteAppointment}
        />
      </div>
    </main>
  );
}
