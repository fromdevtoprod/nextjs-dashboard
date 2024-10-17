import { SelectedPackage } from '@/src/entities/models/package-model';
import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';

export function findAllPackagesUseCase(): Promise<SelectedPackage[]> {
  return new PackagesRepository().findAll();
}
