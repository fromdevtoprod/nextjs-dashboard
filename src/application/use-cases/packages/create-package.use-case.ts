import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';
import { CreatePackagePayload } from '../../repositories/packages.repository.interface';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function createPackageUseCase(
  payload: CreatePackagePayload,
  userEmail: string,
) {
  const userId = await getUserIdUseCase(userEmail);
  return new PackagesRepository().create(payload, userId);
}
