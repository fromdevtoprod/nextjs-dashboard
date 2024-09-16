import { UpdateCarePayload } from '@/src/application/repositories/cares.repository.interface';
import { CreatedCare } from '@/src/entities/models/care';
import { CaresRepository } from '@/src/infrastructure/repositories/cares.repository';

export async function updateCareUseCase({
  amount,
  categoryId,
  duration,
  id,
  name,
}: UpdateCarePayload): Promise<CreatedCare> {
  return new CaresRepository().updateCare({
    amount,
    categoryId,
    duration,
    id,
    name,
  });
}
