import { CreatedCare } from '@/src/entities/models/care';
import { CaresRepository } from '@/src/infrastructure/repositories/cares.repository';

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
}): Promise<CreatedCare> {
  return new CaresRepository().createCare({
    amount,
    categoryId: category,
    duration,
    name,
  });
}
