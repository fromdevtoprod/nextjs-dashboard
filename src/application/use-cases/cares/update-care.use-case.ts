import { CreatedCare } from '@/src/entities/models/care';
import { CaresRepository } from '@/src/infrastructure/repositories/cares.repository';

export async function updateCareUseCase(
  id: string,
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
): Promise<CreatedCare> {
  return new CaresRepository().updateCare({
    amount,
    categoryId: category,
    duration,
    id,
    name,
  });
}
