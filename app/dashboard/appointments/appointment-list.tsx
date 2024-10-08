'use client';

import { useState } from 'react';
import { UpcomingAppointment } from '@/src/entities/models/appointment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AddNotesDialog } from './add-notes-dialog';
import { EditButton } from '@/app/ui/buttons/edit-button';
import { DeleteAppointmentConfirmation } from './delete-appointment-confirmation';

type AppointmentListProps = {
  appointments: UpcomingAppointment[];
  whenDeleteDone: (appointmentId: string) => void;
};

export function AppointmentList({
  appointments,
  whenDeleteDone,
}: AppointmentListProps) {
  const [appointmentNotesId, setAppointmentNotesId] = useState('');
  return (
    <>
      <AddNotesDialog
        appointmentId={appointmentNotesId}
        isOpened={!!appointmentNotesId}
        onOpenChange={() => setAppointmentNotesId('')}
        onDialogSubmit={() => setAppointmentNotesId('')}
      />
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.client_name}</TableCell>
                  <TableCell>{appointment.appointment_type_name}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    {appointment.session_count > 1 ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>{'Paid'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <EditButton
                        isLabelDisplayed={false}
                        onClick={() => setAppointmentNotesId(appointment.id)}
                      />
                      <DeleteAppointmentConfirmation
                        appointmentId={appointment.id}
                        whenDeleteDone={() => whenDeleteDone(appointment.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
