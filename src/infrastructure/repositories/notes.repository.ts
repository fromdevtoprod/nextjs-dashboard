import { sql } from '@vercel/postgres';
import {
  AddNotesPayload,
  INotesRepository,
} from '@/src/application/repositories/notes.repository.interface';

export class NotesRepository implements INotesRepository {
  public async add(payload: AddNotesPayload): Promise<void> {
    await sql`
      INSERT INTO notes (
        appointment_id,
        content
      ) VALUES (
        ${payload.appointment_id},
        ${payload.content}
      ) RETURNING *;
    `;
  }
}
