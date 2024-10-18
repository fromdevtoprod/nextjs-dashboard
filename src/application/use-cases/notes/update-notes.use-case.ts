import { NotesRepository } from '@/src/infrastructure/repositories/notes.repository';
import { Notes } from '@/src/entities/models/notes';
import { UpdateNotesPayload } from '../../repositories/notes.repository.interface';

export async function updateNotesUseCase(
  payload: UpdateNotesPayload,
): Promise<Notes> {
  return new NotesRepository().update(payload);
}
