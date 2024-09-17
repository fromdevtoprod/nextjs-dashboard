import { sql } from '@vercel/postgres';
import {
  CreateCurePayload,
  ICuresRepository,
  UpdateCurePayload,
} from '@/src/application/repositories/cures.repository.interface';
import { CreatedCure, SelectedCure } from '@/src/entities/models/cure';

export class CuresRepository implements ICuresRepository {
  public async countCureTotalSessionNumber(id: string): Promise<number> {
    const queryResult = await sql`
      SELECT SUM(care_1_session_number + COALESCE(care_2_session_number, 0)) FROM cures WHERE id = ${id}
    `;
    return queryResult.rows[0].sum;
  }

  public async createCure(payload: CreateCurePayload): Promise<CreatedCure> {
    console.log('Creating cure');
    const queryResult = await sql<CreatedCure>`
        INSERT INTO cures (amount, care_1_id, care_1_session_number, care_2_id, care_2_session_number, name)
        VALUES (${payload.amount}, ${payload.care_1_id}, ${payload.care_1_session_number}, ${payload.care_2_id}, ${payload.care_2_session_number}, ${payload.name})
        RETURNING *
      `;
    return queryResult.rows[0];
  }

  public async deleteCure(id: string): Promise<void> {
    await sql`DELETE FROM cures WHERE id = ${id}`;
  }

  public async findAll(): Promise<SelectedCure[]> {
    const queryResult = await sql<SelectedCure>`
        SELECT id, amount, care_1_id, care_1_session_number, care_2_id, COALESCE(care_2_session_number, 0) AS care_2_session_number, name FROM cures
      `;
    return queryResult.rows;
  }

  public async findCureById(id: string): Promise<SelectedCure> {
    const queryResult = await sql<SelectedCure>`
        SELECT id, amount, care_1_id, care_1_session_number, care_2_id, COALESCE(care_2_session_number, 0) AS care_2_session_number, name FROM cures WHERE id = ${id}
      `;
    return queryResult.rows[0];
  }

  public async updateCure(payload: UpdateCurePayload): Promise<CreatedCure> {
    console.log('Updating cure');
    const queryResult = await sql<CreatedCure>`
        UPDATE cures
        SET amount = ${payload.amount}, care_1_id = ${payload.care_1_id}, care_1_session_number = ${payload.care_1_session_number}, care_2_id = ${payload.care_2_id}, care_2_session_number = ${payload.care_2_session_number}, name = ${payload.name}
        WHERE id = ${payload.id}
        RETURNING *
      `;
    return queryResult.rows[0];
  }
}
