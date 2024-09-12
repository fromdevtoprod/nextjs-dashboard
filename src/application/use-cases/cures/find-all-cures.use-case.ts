import { SelectedCure } from '@/src/entities/models/cure';
import { CuresRepository } from '@/src/infrastructure/repositories/cures.repository';

export function findAllCuresUseCase(): Promise<SelectedCure[]> {
  return new CuresRepository().findAll();
}
