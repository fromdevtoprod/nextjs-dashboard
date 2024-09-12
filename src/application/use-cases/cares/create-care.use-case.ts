import { Care } from '@/src/entities/models/care';
import { CaresRepository } from '@/src/infrastructure/repositories/cares.repository';
import { ProductsRepository } from '@/src/infrastructure/repositories/products.repository';

export async function createCareUseCase({
  category,
  duration,
  amount,
  name,
}: {
  category: string;
  duration: number;
  amount: number;
  name: string;
}): Promise<Care> {
  const caresRepository = new CaresRepository();
  const productsRepository = new ProductsRepository();
  const product = await productsRepository.createProduct({ amount, name });
  const care = await caresRepository.createCare({
    categoryId: category,
    duration,
    productId: product.id,
  });
  return {
    amount: product.amount,
    category_id: care.category_id,
    duration: care.duration,
    id: product.id,
    name: product.name,
  };
}
