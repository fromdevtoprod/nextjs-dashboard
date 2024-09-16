import { sql } from '@vercel/postgres';
import {
  CreateCurePayload,
  ICuresRepository,
  UpdateCurePayload,
} from '@/src/application/repositories/cures.repository.interface';
import { CreatedCure, SelectedCure } from '@/src/entities/models/cure';

export class CuresRepository implements ICuresRepository {
  public async createCure({
    amount,
    care_1_id,
    care_1_session_number,
    care_2_id,
    care_2_session_number,
    name,
  }: CreateCurePayload): Promise<CreatedCure> {
    console.log('Creating cure');
    const queryResult = await sql<CreatedCure>`
        INSERT INTO cures (amount, care_1_id, care_1_session_number, care_2_id, care_2_session_number, name)
        VALUES (${amount}, ${care_1_id}, ${care_1_session_number}, ${care_2_id}, ${care_2_session_number}, ${name})
        RETURNING *
      `;
    return {
      id: queryResult.rows[0].id,
      amount: queryResult.rows[0].amount,
      care_1_id: queryResult.rows[0].care_1_id,
      care_1_session_number: queryResult.rows[0].care_1_session_number,
      care_2_id: queryResult.rows[0].care_2_id,
      care_2_session_number: queryResult.rows[0].care_2_session_number,
      name: queryResult.rows[0].name,
    };
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

  public async updateCure({
    amount,
    care_1_id,
    care_1_session_number,
    care_2_id,
    care_2_session_number,
    id,
    name,
  }: UpdateCurePayload): Promise<CreatedCure> {
    console.log('Updating cure');
    const queryResult = await sql<CreatedCure>`
        UPDATE cures
        SET amount = ${amount}, care_1_id = ${care_1_id}, care_1_session_number = ${care_1_session_number}, care_2_id = ${care_2_id}, care_2_session_number = ${care_2_session_number}, name = ${name}
        WHERE id = ${id}
        RETURNING *
      `;
    return {
      id: queryResult.rows[0].id,
      amount: queryResult.rows[0].amount,
      care_1_id: queryResult.rows[0].care_1_id,
      care_1_session_number: queryResult.rows[0].care_1_session_number,
      care_2_id: queryResult.rows[0].care_2_id,
      care_2_session_number: queryResult.rows[0].care_2_session_number,
      name: queryResult.rows[0].name,
    };
  }
}
