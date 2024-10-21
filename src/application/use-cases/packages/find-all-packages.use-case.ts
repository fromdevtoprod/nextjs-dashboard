import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function findAllPackagesUseCase(userEmail: string) {
  const userId = await getUserIdUseCase(userEmail);
  if (!userId) {
    throw new Error('User not found');
  }

  return new PackagesRepository().findAll(userId);
}
