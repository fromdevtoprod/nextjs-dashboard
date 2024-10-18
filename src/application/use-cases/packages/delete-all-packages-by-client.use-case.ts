import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';

export async function deleteAllPackagesByClientUseCase(customerId: string) {
  return new PackagesRepository().deleteByCustomerId(customerId);
}
