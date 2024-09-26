import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';

export function findAllPackagesUseCase() {
  return new PackagesRepository().findAll();
}
