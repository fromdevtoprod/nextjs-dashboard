import { SelectedCareCategory } from '@/src/entities/models/care-category';

export interface ICareCategoriesRepository {
  findAll(): Promise<SelectedCareCategory[]>;
}
