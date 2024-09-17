import { findAllCaresByCategoryNameUseCase } from '@/src/application/use-cases/cares/find-all-cares.use-case';
import { SelectedCare } from '@/src/entities/models/care';

export async function findCaresByCategoryNameController(
  name: string,
): Promise<SelectedCare[]> {
  return findAllCaresByCategoryNameUseCase(name);
}
