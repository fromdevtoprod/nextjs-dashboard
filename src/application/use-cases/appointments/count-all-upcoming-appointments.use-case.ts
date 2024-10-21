import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function countAllUpcomingAppointmentsUseCase(userEmail: string) {
  const userId = await getUserIdUseCase(userEmail);
  if (!userId) {
    throw new Error('User not found');
  }
  return new AppointmentsRepository().countAllUpcomingAppointments(userId);
}
