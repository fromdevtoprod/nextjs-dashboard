import { CaresRepository } from '@/src/infrastructure/repositories/cares.repository';
import { ProductsRepository } from '@/src/infrastructure/repositories/products.repository';

export async function deleteCareUseCase(productId: string): Promise<void> {
  const caresRepository = new CaresRepository();
  const productsRepository = new ProductsRepository();
  await caresRepository.deleteCare(productId);
  await productsRepository.deleteProduct(productId);
}
