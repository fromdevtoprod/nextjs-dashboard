import { SelectedCare } from '@/src/entities/models/care';
import { CaresRepository } from '@/src/infrastructure/repositories/cares.repository';

export function findCareByIdUseCase(id: string): Promise<SelectedCare> {
  return new CaresRepository().findCareById(id);
}
