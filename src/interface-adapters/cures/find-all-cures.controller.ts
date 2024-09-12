import { findAllCuresUseCase } from '@/src/application/use-cases/cures/find-all-cures.use-case';
import { SelectedCure } from '@/src/entities/models/cure';

export async function findAllCuresController(): Promise<SelectedCure[]> {
  return findAllCuresUseCase();
}
