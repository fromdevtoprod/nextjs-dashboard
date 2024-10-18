'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Clock, HandHeart, NotebookPen, User } from 'lucide-react';
import { AppointmentWithTime } from '@/app/lib/data/appointments';
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
  appointments: AppointmentWithTime[];
  whenDeleteDone: (appointmentId: string) => void;
};

export function AppointmentList({
  appointments,
  whenDeleteDone,
}: AppointmentListProps) {
  const t = useTranslations('Appointments');
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
                      {appointment.customer.name}
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
                      status={appointment.payments[0].status}
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
