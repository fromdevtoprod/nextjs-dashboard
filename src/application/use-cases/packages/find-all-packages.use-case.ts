import { Package } from '@/src/entities/models/package-model';
import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';

export function findAllPackagesUseCase(): Promise<Package[]> {
  return new PackagesRepository().findAll();
}
