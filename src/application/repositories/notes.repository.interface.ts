import { Notes } from '@/src/entities/models/notes';

export type AddNotesPayload = {
  appointment_id: string;
  content: string;
};

export type UpdateNotesPayload = {
  id: string;
  content: string;
};

export interface INotesRepository {
  add(payload: AddNotesPayload): Promise<Notes>;
  update(payload: UpdateNotesPayload): Promise<Notes>;
  delete(appointmentId: string): Promise<void>;
}
