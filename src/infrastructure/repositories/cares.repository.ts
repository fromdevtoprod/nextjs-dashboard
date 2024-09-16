import { sql } from '@vercel/postgres';
import { CreatedCare, SelectedCare } from '@/src/entities/models/care';
import {
  CreateCarePayload,
  ICaresRepository,
  UpdateCarePayload,
} from '@/src/application/repositories/cares.repository.interface';

export class CaresRepository implements ICaresRepository {
  public async createCare(payload: CreateCarePayload): Promise<CreatedCare> {
    const queryResult =
      await sql<CreatedCare>`INSERT INTO cares (amount, category_id, duration, name) VALUES (${payload.amount}, ${payload.categoryId}, ${payload.duration}, ${payload.name}) RETURNING *`;
    return queryResult.rows[0];
  }

  public async deleteCare(id: string): Promise<void> {
    await sql`DELETE FROM cares WHERE id = ${id}`;
  }

  public async findAllCaresByCategoryName(
    name: string,
  ): Promise<SelectedCare[]> {
    const queryResult = await sql<SelectedCare>`
      SELECT
        amount,
        category_id,
        care_categories.name AS category_name,
        duration,
        cares.id,
        cares.name
      FROM cares
      LEFT JOIN care_categories ON cares.category_id = care_categories.id
      WHERE care_categories.name = ${name}
    `;
    return queryResult.rows;
  }

  public async findAll(): Promise<SelectedCare[]> {
    const queryResult = await sql<SelectedCare>`
      SELECT
        amount,
        category_id,
        care_categories.name AS category_name,
        duration,
        cares.id,
        cares.name
      FROM cares
      LEFT JOIN care_categories ON cares.category_id = care_categories.id
    `;
    return queryResult.rows;
  }

  public async findCareById(id: string): Promise<SelectedCare> {
    const queryResult = await sql<SelectedCare>`
      SELECT
        amount,
        category_id,
        care_categories.name AS category_name,
        duration,
        cares.id,
        cares.name
      FROM cares
      LEFT JOIN care_categories ON cares.category_id = care_categories.id
      WHERE cares.id = ${id}
    `;
    return queryResult.rows[0];
  }

  public async updateCare(payload: UpdateCarePayload): Promise<CreatedCare> {
    const queryResult =
      await sql<CreatedCare>`UPDATE cares SET amount = ${payload.amount}, category_id = ${payload.categoryId}, duration = ${payload.duration}, name = ${payload.name} WHERE id = ${payload.id} RETURNING *`;
    return queryResult.rows[0];
  }
}
