'use client';

import { useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { deleteAppointment } from '@/app/lib/actions/appointments';
import { UpcomingAppointment } from '@/src/entities/models/appointment';
import { Button } from '@/components/ui/button';
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

type AppointmentListProps = {
  appointments: UpcomingAppointment[];
  whenDeleteDone: (appointmentId: string) => void;
};

export function AppointmentList({
  appointments,
  whenDeleteDone,
}: AppointmentListProps) {
  const [appointmentNotesId, setAppointmentNotesId] = useState('');

  const handleDeleteClick = async (appointmentId: string) => {
    await deleteAppointment(appointmentId);
    whenDeleteDone(appointmentId);
  };

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
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAppointmentNotesId(appointment.id)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(appointment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
