import { SelectedCare } from '@/src/entities/models/care';
import { CaresRepository } from '@/src/infrastructure/repositories/cares.repository';

export function findAllCaresUseCase(): Promise<SelectedCare[]> {
  return new CaresRepository().findAll();
}

export function findAllCaresByCategoryNameUseCase(
  name: string,
): Promise<SelectedCare[]> {
  return new CaresRepository().findAllCaresByCategoryName(name);
}
