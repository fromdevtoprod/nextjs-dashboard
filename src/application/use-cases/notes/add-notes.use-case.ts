import { NotesRepository } from '@/src/infrastructure/repositories/notes.repository';
import { Notes } from '@/src/entities/models/notes';
import { AddNotesPayload } from '../../repositories/notes.repository.interface';

export async function addNotesUseCase(
  payload: AddNotesPayload,
): Promise<Notes> {
  return new NotesRepository().add(payload);
}
