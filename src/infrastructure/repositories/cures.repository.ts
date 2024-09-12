import { sql } from '@vercel/postgres';
import { ICuresRepository } from '@/src/application/repositories/cures.repository.interface';
import { SelectedCure } from '@/src/entities/models/cure';

export class CuresRepository implements ICuresRepository {
  public async findAll(): Promise<SelectedCure[]> {
    const queryResult = await sql<SelectedCure>`
        SELECT id, amount, care_1_id, care_1_session_number, care_2_id, COALESCE(care_2_session_number, 0) AS care_2_session_number, name FROM cures
      `;
    return queryResult.rows;
  }
}
