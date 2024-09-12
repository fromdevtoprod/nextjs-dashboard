import { deleteCareUseCase } from '@/src/application/use-cases/cares/delete-care.use-case';

export function deleteCareController(productId: string) {
  return deleteCareUseCase(productId);
}
