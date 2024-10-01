import { SelectedPackage } from '@/src/entities/models/package-model';
import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';

export function findAllUncompletedPackagesUseCase(): Promise<
  SelectedPackage[]
> {
  return new PackagesRepository().findAllUncompletedPackages();
}
