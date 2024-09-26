import { findAllPackagesUseCase } from '@/src/application/use-cases/packages/find-all-packages.use-case';

export async function findAllPackagesController() {
  return findAllPackagesUseCase();
}
