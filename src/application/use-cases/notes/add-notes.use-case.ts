import { NotesRepository } from '@/src/infrastructure/repositories/notes.repository';
import { AddNotesPayload } from '../../repositories/notes.repository.interface';

const notesRepository = new NotesRepository();

export async function addNotesUseCase(payload: AddNotesPayload): Promise<void> {
  return notesRepository.add(payload);
}
