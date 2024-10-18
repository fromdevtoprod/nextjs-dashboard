import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';
import { CreatePackagePayload } from '../../repositories/packages.repository.interface';

export async function createPackageUseCase(payload: CreatePackagePayload) {
  return new PackagesRepository().create(payload);
}
