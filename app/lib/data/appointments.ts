import { countAllAppointmentsUseCase } from '@/src/application/use-cases/appointments/count-all-appointments.use-case';
import { countAllUpcomingAppointmentsUseCase } from '@/src/application/use-cases/appointments/count-all-upcoming-appointments.use-case';
import { findAllAppointmentsByClientUseCase } from '@/src/application/use-cases/appointments/find-all-appointments-by-client.use-case';
import { findAllAppointmentsByDateUseCase } from '@/src/application/use-cases/appointments/find-all-appointments-by-date.use-case';
import { findAllUpcomingAppointmentsUseCase } from '@/src/application/use-cases/appointments/find-all-upcoming-appointments.use-case';
import {
  Appointment,
  HistoryAppointment,
} from '@/src/entities/models/appointment';

export type AppointmentWithTime = Omit<Appointment, 'date'> & {
  date: string;
  time: string;
};

export async function fetchAllAppointmentsByClient(
  clientId: string,
): Promise<HistoryAppointment[]> {
  try {
    const clientAppointments =
      await findAllAppointmentsByClientUseCase(clientId);
    return clientAppointments;
  } catch (error) {
    console.error(
      'fetchAllAppointmentsByClient >> findAllAppointmentsByClientUseCase',
      error,
    );
    throw new Error('Failed to fetch appointments by client.');
  }
}

export async function fetchAllAppointmentsByDate(
  day: number,
  month: number,
  year: number,
): Promise<AppointmentWithTime[]> {
  try {
    const appointmentsByDate = await findAllAppointmentsByDateUseCase({
      day,
      month,
      year,
    });
    return appointmentsByDate.map((row) => ({
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
  } catch (error) {
    console.error(
      'fetchAllAppointmentsByDate >> findAllAppointmentsByDateUseCase',
      error,
    );
    return [];
  }
}

export async function fetchAllUpcomingAppointments() {
  try {
    const upcomingAppointments = await findAllUpcomingAppointmentsUseCase();
    return upcomingAppointments;
  } catch (error) {
    console.error(
      'fetchAllUpcomingAppointments >> findAllUpcomingAppointmentsUseCase',
      error,
    );
    throw new Error('Failed to fetch all upcoming appointments.');
  }
}

export async function countAllAppointments(): Promise<number> {
  try {
    const appointmentsCount = await countAllAppointmentsUseCase();
    return appointmentsCount;
  } catch (error) {
    console.error('countAllAppointments >> countAllAppointmentsUseCase', error);
    return 0;
  }
}

export async function countAllUpcomingAppointments(): Promise<number> {
  try {
    const upcomingAppointmentsCount =
      await countAllUpcomingAppointmentsUseCase();
    return upcomingAppointmentsCount;
  } catch (error) {
    console.error(
      'countAllUpcomingAppointments >> countAllUpcomingAppointmentsUseCase',
      error,
    );
    return 0;
  }
}
