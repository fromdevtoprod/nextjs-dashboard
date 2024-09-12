import { sql } from '@vercel/postgres';
import { ICareCategoriesRepository } from '@/src/application/repositories/care-categories.repository.interface';
import { SelectedCareCategory } from '@/src/entities/models/care-category';

export class CareCategoriesRepository implements ICareCategoriesRepository {
  public async findAll(): Promise<SelectedCareCategory[]> {
    const queryResult =
      await sql<SelectedCareCategory>`SELECT id, name FROM care_categories`;
    return queryResult.rows;
  }
}
