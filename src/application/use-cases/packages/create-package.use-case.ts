import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';
import { CreatePackagePayload } from '../../repositories/packages.repository.interface';

const packagesRepository = new PackagesRepository();

export async function createPackageUseCase(payload: CreatePackagePayload) {
  return packagesRepository.create(payload);
}
