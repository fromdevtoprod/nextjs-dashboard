import { Product } from '@/src/entities/models/product';

export interface ICProductsRepository {
  createProduct({
    amount,
    name,
  }: {
    amount: number;
    name: string;
  }): Promise<Product>;
  deleteProduct(productId: string): Promise<void>;
  updateProduct({
    amount,
    name,
    id,
  }: {
    amount: number;
    name: string;
    id: string;
  }): Promise<Product>;
}
