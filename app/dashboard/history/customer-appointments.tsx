// import { Info } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
import { fetchAllAppointmentsByClient } from '@/app/lib/data/appointments';
import { HistoryAppointment } from '@/src/entities/models/appointment';
// import { AppointmentDetailsDialog } from './appointment-details-dialog';

type CustomerAppointmentsProps = {
  selectedCustomerId: string;
};

export async function CustomerAppointments({
  selectedCustomerId,
}: CustomerAppointmentsProps) {
  const appointments = await fetchAllAppointmentsByClient(selectedCustomerId);
  return (
    <>
      {appointments.map((appointment: HistoryAppointment) => (
        <TableRow key={appointment.id}>
          <TableCell>
            {new Date(appointment.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </TableCell>
          <TableCell>{appointment.type}</TableCell>
          {appointment.notes ? (
            <TableCell>{appointment.notes}</TableCell>
          ) : (
            <TableCell>No notes</TableCell>
          )}
          {/* <TableCell>
            <AppointmentDetailsDialog
              id={appointment.id}
              date={appointment.date}
              type={appointment.type}
              notes={appointment.notes}
            />
          </TableCell> */}
        </TableRow>
      ))}
    </>
  );
}
