import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function countAllUpcomingAppointmentsUseCase(userEmail: string) {
  const userId = await getUserIdUseCase(userEmail);
  return new AppointmentsRepository().countAllUpcomingAppointments(userId);
}
