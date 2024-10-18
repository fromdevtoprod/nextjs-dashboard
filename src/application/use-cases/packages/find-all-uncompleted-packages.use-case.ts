import { Package } from '@/src/entities/models/package-model';
import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';

export function findAllUncompletedPackagesUseCase(): Promise<Package[]> {
  return new PackagesRepository().findAllUncompletedPackages();
}
