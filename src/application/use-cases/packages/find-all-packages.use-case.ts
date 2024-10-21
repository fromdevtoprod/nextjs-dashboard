import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function findAllPackagesUseCase(userEmail: string) {
  const userId = await getUserIdUseCase(userEmail);
  return new PackagesRepository().findAll(userId);
}
