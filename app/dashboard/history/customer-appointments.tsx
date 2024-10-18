import { TableCell, TableRow } from '@/components/ui/table';
import { fetchAllAppointmentsByClient } from '@/app/lib/data/appointments';
import { Appointment } from '@/src/entities/models/appointment';
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
      {appointments.map((appointment: Appointment) => (
        <TableRow key={appointment.id}>
          <TableCell>
            {new Date(appointment.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </TableCell>
          <TableCell>{appointment.appointmentType.name}</TableCell>
          {Array.isArray(appointment.notes) && appointment.notes.length > 0 ? (
            <TableCell>{appointment.notes[0].content}</TableCell>
          ) : (
            <TableCell>-</TableCell>
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
