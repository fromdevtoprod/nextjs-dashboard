import { CreatedCare } from '@/src/entities/models/care';
import { CaresRepository } from '@/src/infrastructure/repositories/cares.repository';
import { CreateCarePayload } from '@/src/application/repositories/cares.repository.interface';

export async function createCareUseCase({
  categoryId,
  duration,
  amount,
  name,
}: CreateCarePayload): Promise<CreatedCare> {
  return new CaresRepository().createCare({
    amount,
    categoryId,
    duration,
    name,
  });
}
