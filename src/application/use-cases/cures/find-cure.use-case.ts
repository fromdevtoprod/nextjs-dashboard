import { CuresRepository } from '@/src/infrastructure/repositories/cures.repository';

export function findCureByIdUseCase(id: string) {
  return new CuresRepository().findCureById(id);
}
