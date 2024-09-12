import { CaresRepository } from '@/src/infrastructure/repositories/cares.repository';

export async function deleteCareUseCase(productId: string): Promise<void> {
  return new CaresRepository().deleteCare(productId);
}
