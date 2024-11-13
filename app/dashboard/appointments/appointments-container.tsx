'use client';

import { useEffect, useState } from 'react';
import { AppointmentsHeader } from './appointments-header';
import { AppointmentsCalendar } from './appointments-calendar';
import { AppointmentList, AppointmentWithTime } from './appointment-list';
import { Appointment } from '@/src/entities/models/appointment';
import { Toaster } from '@/components/ui/toaster';
import { AppointmentTypesWithRemainingSessions } from '@/src/application/use-cases/appointment-types/find-appointment-types-with-remaining-sessions.use-case';
import { Notes } from '@/src/entities/models/notes';

type AppointmentsContainerProps = {
  activeDay: number;
  activeMonth: number;
  activeYear: number;
  appointmentTypes: AppointmentTypesWithRemainingSessions[];
  initialAppointments: Appointment[];
  userEmail: string;
};

export function AppointmentsContainer({
  activeDay,
  activeMonth,
  activeYear,
  appointmentTypes,
  initialAppointments,
  userEmail,
}: AppointmentsContainerProps) {
  const [upcomingAppointments, setUpcomingAppointments] =
    useState<Appointment[]>(initialAppointments);

  const handleAddAppointment = (createdAppointment: Appointment) => {
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

  const handleUpdatedNotes = (updatedNotes: Notes) => {
    const { id, appointmentId, content } = updatedNotes;
    setUpcomingAppointments((prevAppointments) =>
      prevAppointments.map((appointment) => {
        if (appointment.id === appointmentId) {
          return {
            ...appointment,
            notes: [
              {
                id,
                appointmentId,
                content,
              },
            ],
          };
        }
        return appointment;
      }),
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
        userEmail={userEmail}
        onAddAppointment={handleAddAppointment}
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 w-[32rem]">
          <AppointmentsCalendar />
        </div>

        <div className="col-span-3">
          <AppointmentList
            appointments={formatDateAndTime(upcomingAppointments)}
            appointmentDate={{
              day: activeDay,
              month: activeMonth,
              year: activeYear,
            }}
            whenDeleteDone={handleDeleteAppointment}
            whenNotesUpdateDone={handleUpdatedNotes}
          />
        </div>
      </div>

      <Toaster />
    </main>
  );
}

function formatDateAndTime(appointments: Appointment[]): AppointmentWithTime[] {
  return appointments.map((row) => ({
    ...row,
    date: new Date(row.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    time: new Date(row.date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
  }));
}
