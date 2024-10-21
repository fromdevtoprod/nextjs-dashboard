import { countAllAppointmentsUseCase } from '@/src/application/use-cases/appointments/count-all-appointments.use-case';
import { countAllUpcomingAppointmentsUseCase } from '@/src/application/use-cases/appointments/count-all-upcoming-appointments.use-case';
import { findAllAppointmentsByClientUseCase } from '@/src/application/use-cases/appointments/find-all-appointments-by-client.use-case';
import { findAllAppointmentsByDateUseCase } from '@/src/application/use-cases/appointments/find-all-appointments-by-date.use-case';
import { Appointment } from '@/src/entities/models/appointment';

type FetchAllAppointmentsParameters = {
  day: number;
  month: number;
  year: number;
};

export async function fetchAllAppointmentsByClient(
  clientId: string,
): Promise<Appointment[]> {
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
  { day, month, year }: FetchAllAppointmentsParameters,
  userEmail: string,
): Promise<Appointment[]> {
  try {
    const appointmentsByDate = await findAllAppointmentsByDateUseCase(
      {
        day,
        month,
        year,
      },
      userEmail,
    );
    return appointmentsByDate;
  } catch (error) {
    console.error(
      'fetchAllAppointmentsByDate >> findAllAppointmentsByDateUseCase',
      error,
    );
    return [];
  }
}

export async function countAllAppointments(userEmail: string): Promise<number> {
  try {
    const appointmentsCount = await countAllAppointmentsUseCase(userEmail);
    return appointmentsCount;
  } catch (error) {
    console.error('countAllAppointments >> countAllAppointmentsUseCase', error);
    return 0;
  }
}

export async function countAllUpcomingAppointments(
  userEmail: string,
): Promise<number> {
  try {
    const upcomingAppointmentsCount =
      await countAllUpcomingAppointmentsUseCase(userEmail);
    return upcomingAppointmentsCount;
  } catch (error) {
    console.error(
      'countAllUpcomingAppointments >> countAllUpcomingAppointmentsUseCase',
      error,
    );
    return 0;
  }
}
