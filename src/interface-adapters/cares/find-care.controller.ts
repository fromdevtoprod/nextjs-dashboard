import { findCareByIdUseCase } from '@/src/application/use-cases/cares/find-care.use-case';
import { SelectedCare } from '@/src/entities/models/care';

export async function findCareByIdController(
  id: string,
): Promise<SelectedCare> {
  return findCareByIdUseCase(id);
}
