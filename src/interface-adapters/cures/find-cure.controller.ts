import { findCureByIdUseCase } from '@/src/application/use-cases/cures/find-cure.use-case';
import { SelectedCure } from '@/src/entities/models/cure';

export async function findCureByIdController(
  id: string,
): Promise<SelectedCure> {
  return findCureByIdUseCase(id);
}
