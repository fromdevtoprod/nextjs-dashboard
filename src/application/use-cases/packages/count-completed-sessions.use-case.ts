import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function countCompletedSessionsUseCase(userEmail: string) {
  const userId = await getUserIdUseCase(userEmail);
  return new PackagesRepository().countCompletedSessions(userId);
}
