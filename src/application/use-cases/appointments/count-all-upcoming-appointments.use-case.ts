import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function countAllUpcomingAppointmentsUseCase(): Promise<number> {
  return new AppointmentsRepository().countAllUpcomingAppointments();
}
