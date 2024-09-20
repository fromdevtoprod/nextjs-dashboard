import { findCureByIdUseCase } from '@/src/application/use-cases/cures/find-cure.use-case';

export async function findCureByIdController(id: string) {
  return findCureByIdUseCase(id);
}
