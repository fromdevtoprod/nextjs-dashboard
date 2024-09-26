import { CreatedPackage } from '@/src/entities/models/package-model';
import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';

const packagesRepository = new PackagesRepository();

export async function createPackageUseCase(payload: CreatedPackage) {
  return packagesRepository.create(payload);
}
