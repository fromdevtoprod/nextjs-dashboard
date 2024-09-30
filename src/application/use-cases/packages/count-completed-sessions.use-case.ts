import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';

export function countCompletedSessionsUseCase(): Promise<number> {
  return new PackagesRepository().countCompletedSessions();
}
