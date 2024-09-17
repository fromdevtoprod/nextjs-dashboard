import { findAllCaresUseCase } from '@/src/application/use-cases/cares/find-all-cares.use-case';
import { SelectedCare } from '@/src/entities/models/care';

export async function findAllCaresController(): Promise<SelectedCare[]> {
  return findAllCaresUseCase();
}
