import { Care } from '@/src/entities/models/care';
import { CaresRepository } from '@/src/infrastructure/repositories/cares.repository';
import { ProductsRepository } from '@/src/infrastructure/repositories/products.repository';

export async function updateCareUseCase(
  productId: string,
  {
    amount,
    category,
    duration,
    name,
  }: {
    amount: number;
    category: string;
    duration: number;
    name: string;
  },
): Promise<Care> {
  const caresRepository = new CaresRepository();
  const productsRepository = new ProductsRepository();
  const product = await productsRepository.updateProduct({
    amount,
    id: productId,
    name,
  });
  const care = await caresRepository.updateCare({
    categoryId: category,
    duration,
    productId,
  });
  return {
    amount: product.amount,
    category_id: care.category_id,
    duration: care.duration,
    id: product.id,
    name: product.name,
  };
}
