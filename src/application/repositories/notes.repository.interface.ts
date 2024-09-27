export type AddNotesPayload = {
  appointment_id: string;
  content: string;
};

export interface INotesRepository {
  add(payload: AddNotesPayload): Promise<void>;
  delete(appointmentId: string): Promise<void>;
}
