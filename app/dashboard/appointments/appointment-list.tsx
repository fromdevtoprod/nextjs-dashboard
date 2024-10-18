'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Clock, HandHeart, NotebookPen, User } from 'lucide-react';
import { Appointment } from '@/src/entities/models/appointment';
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
import { Notes } from '@/src/entities/models/notes';
import { Button } from '@/components/ui/button';
import { AddNotesDialog } from './add-notes-dialog';
import { DeleteAppointmentConfirmation } from './delete-appointment-confirmation';
import { EditNotesDialog } from './edit-notes-dialog';

export type AppointmentWithTime = Omit<Appointment, 'date'> & {
  date: string;
  time: string;
};

type AppointmentListProps = {
  appointments: AppointmentWithTime[];
  whenDeleteDone: (appointmentId: string) => void;
  whenNotesUpdateDone: (updatedNotes: Notes) => void;
};

export function AppointmentList({
  appointments,
  whenDeleteDone,
  whenNotesUpdateDone,
}: AppointmentListProps) {
  const t = useTranslations('Appointments');

  const [appointmentNotesId, setAppointmentNotesId] = useState('');

  const notes = appointments.find(
    (appointment) => appointment.id === appointmentNotesId,
  )?.notes;

  const hasNotes = Array.isArray(notes) && notes.length > 0;

  const handleUpdateNotes = (updatedNotes: Notes) => {
    setAppointmentNotesId('');
    whenNotesUpdateDone(updatedNotes);
  };

  return (
    <>
      {appointmentNotesId && !hasNotes && (
        <AddNotesDialog
          appointmentId={appointmentNotesId}
          isOpened={true}
          onOpenChange={() => setAppointmentNotesId('')}
          onDialogSubmit={() => setAppointmentNotesId('')}
        />
      )}
      {appointmentNotesId && hasNotes && (
        <EditNotesDialog
          notesId={notes[0].id}
          isOpened={true}
          notes={notes?.map((note) => note.content).join('\n')}
          onOpenChange={() => setAppointmentNotesId('')}
          onDialogSubmit={handleUpdateNotes}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle>{t('upcomingAppointments')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('client')}</TableHead>
                <TableHead>{t('type')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('time')}</TableHead>
                <TableHead>{t('package')}</TableHead>
                <TableHead>{t('payment')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      {appointment?.customer?.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <HandHeart className="mr-1 h-4 w-4" />
                      {appointment.appointmentType.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {appointment.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {appointment.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    {appointment.appointmentType.session_count > 1
                      ? t('yes')
                      : t('no')}
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge
                      status={
                        Array.isArray(appointment.payments) &&
                        appointment.payments.length > 0
                          ? appointment.payments[0]?.status
                          : null
                      }
                    />
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
