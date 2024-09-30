import { CreatePackagePayload } from '@/src/application/repositories/packages.repository.interface';
import { createPackageUseCase } from '@/src/application/use-cases/packages/create-package.use-case';

export async function createPackageController(payload: CreatePackagePayload) {
  return createPackageUseCase(payload);
}
