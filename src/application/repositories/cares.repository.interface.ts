import { CreatedCare, SelectedCare } from '@/src/entities/models/care';

export interface ICaresRepository {
  createCare({
    amount,
    categoryId,
    duration,
    name,
  }: {
    amount: number;
    categoryId: string;
    duration: number;
    name: string;
  }): Promise<CreatedCare>;
  deleteCare(productId: string): Promise<void>;
  findAll(): Promise<SelectedCare[]>;
  findCareById(id: string): Promise<SelectedCare>;
  updateCare({
    categoryId,
    duration,
    id,
    name,
  }: {
    categoryId: string;
    duration: number;
    id: string;
    name: string;
  }): Promise<CreatedCare>;
}
