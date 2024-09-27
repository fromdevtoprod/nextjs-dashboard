import { findAllAppointmentsByDateUseCase } from '@/src/application/use-cases/appointments/find-all-appointments-by-date.use-case';
import { findAllUpcomingAppointmentsUseCase } from '@/src/application/use-cases/appointments/find-all-upcoming-appointments.use-case';
import { UpcomingAppointment } from '@/src/entities/models/appointment';

export async function fetchAllAppointmentsByDate(
  day: number,
  month: number,
  year: number,
): Promise<UpcomingAppointment[]> {
  try {
    const appointmentsByDate = await findAllAppointmentsByDateUseCase({
      day,
      month,
      year,
    });
    return appointmentsByDate;
  } catch (error) {
    console.error(
      'fetchAllAppointmentsByDate >> findAllAppointmentsByDateUseCase',
      error,
    );
    throw new Error('Failed to fetch appointments by date.');
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
