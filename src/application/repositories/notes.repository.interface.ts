export type AddNotesPayload = {
  appointment_id: string;
  content: string;
};

export interface INotesRepository {
  add(payload: AddNotesPayload): Promise<void>;
}
