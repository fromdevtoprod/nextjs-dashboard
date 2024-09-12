import { findAllCareCategoriesUseCase } from '@/src/application/use-cases/care-categories/find-all-care-categories.use-case';
import { SelectedCareCategory } from '@/src/entities/models/care-category';

export async function findAllCaresCategoriesController(): Promise<
  SelectedCareCategory[]
> {
  return findAllCareCategoriesUseCase();
}
