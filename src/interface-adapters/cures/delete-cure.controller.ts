import { deleteCureUseCase } from '@/src/application/use-cases/cures/delete-cure.use-case';

export async function deleteCureController(cureId: string) {
  return deleteCureUseCase(cureId);
}
