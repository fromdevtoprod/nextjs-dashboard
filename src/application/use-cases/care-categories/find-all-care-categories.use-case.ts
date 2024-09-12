import { SelectedCareCategory } from '@/src/entities/models/care-category';
import { CareCategoriesRepository } from '@/src/infrastructure/repositories/care-categories.repository';

export function findAllCareCategoriesUseCase(): Promise<
  SelectedCareCategory[]
> {
  return new CareCategoriesRepository().findAll();
}
