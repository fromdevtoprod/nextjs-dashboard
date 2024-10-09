'use client';

import { useState } from 'react';
import { NotebookPen } from 'lucide-react';
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
import { PaymentStatusBadge } from '@/app/ui/badges/payment-status-badge';
import { Button } from '@/components/ui/button';
import { AddNotesDialog } from './add-notes-dialog';
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
                  <TableCell>
                    <PaymentStatusBadge status={appointment.payment_status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAppointmentNotesId(appointment.id)}
                      >
                        <NotebookPen className="h-4 w-4" />
                      </Button>
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
