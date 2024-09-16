import { CreatedCare, SelectedCare } from '@/src/entities/models/care';

export type CreateCarePayload = {
  amount: number;
  categoryId: string;
  duration: number;
  name: string;
};

export type UpdateCarePayload = CreateCarePayload & {
  id: string;
};

export interface ICaresRepository {
  createCare({
    amount,
    categoryId,
    duration,
    name,
  }: CreateCarePayload): Promise<CreatedCare>;
  deleteCare(id: string): Promise<void>;
  findAll(): Promise<SelectedCare[]>;
  findAllCaresByCategoryName(name: string): Promise<SelectedCare[]>;
  findCareById(id: string): Promise<SelectedCare>;
  updateCare({
    categoryId,
    duration,
    id,
    name,
  }: UpdateCarePayload): Promise<CreatedCare>;
}
