import { NotesRepository } from '@/src/infrastructure/repositories/notes.repository';

export async function deleteNotesUseCase(appointmentId: string): Promise<void> {
  return new NotesRepository().delete(appointmentId);
}
