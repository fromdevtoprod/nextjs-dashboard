import { SelectedCure } from '@/src/entities/models/cure';
import { CuresRepository } from '@/src/infrastructure/repositories/cures.repository';

export function findCureByIdUseCase(id: string): Promise<SelectedCure> {
  return new CuresRepository().findCureById(id);
}
