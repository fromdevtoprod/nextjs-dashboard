import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function countAllAppointmentsUseCase(): Promise<number> {
  return new AppointmentsRepository().countLastYearAppointments();
}
