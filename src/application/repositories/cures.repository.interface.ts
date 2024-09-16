import { CreatedCure, SelectedCure } from '@/src/entities/models/cure';

export type CreateCurePayload = {
  amount: number;
  care_1_id: string;
  care_1_session_number: number;
  care_2_id: string | null;
  care_2_session_number: number;
  name: string;
};

export type UpdateCurePayload = { id: string } & CreateCurePayload;

export interface ICuresRepository {
  createCure({}: CreateCurePayload): Promise<CreatedCure>;
  deleteCure(id: string): Promise<void>;
  findAll(): Promise<SelectedCure[]>;
  findCureById(id: string): Promise<SelectedCure>;
  updateCure({}: UpdateCurePayload): Promise<CreatedCure>;
}
