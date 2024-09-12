import { CreatedCare } from '@/src/entities/models/care';

export interface ICaresRepository {
  createCare({
    categoryId,
    duration,
    productId,
  }: {
    categoryId: string;
    duration: number;
    productId: string;
  }): Promise<CreatedCare>;
  deleteCare(productId: string): Promise<void>;
  updateCare({
    categoryId,
    duration,
    productId,
  }: {
    categoryId: string;
    duration: number;
    productId: string;
  }): Promise<CreatedCare>;
}
