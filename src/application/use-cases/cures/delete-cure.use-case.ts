import { CuresRepository } from '@/src/infrastructure/repositories/cures.repository';

export async function deleteCureUseCase(cureId: string) {
  return new CuresRepository().deleteCure(cureId);
}
