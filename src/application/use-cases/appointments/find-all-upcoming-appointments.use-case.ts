import { UpcomingAppointment } from '@/src/entities/models/appointment';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function findAllUpcomingAppointmentsUseCase(): Promise<
  UpcomingAppointment[]
> {
  const upcomingAppointments =
    await new AppointmentsRepository().findAllUpcomingAppointments();
  const upcomingAppointmentsWithTime = upcomingAppointments.map((row) => ({
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
  return upcomingAppointmentsWithTime;
}
