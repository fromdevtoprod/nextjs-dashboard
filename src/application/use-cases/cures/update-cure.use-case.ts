import { UpdateCurePayload } from '@/src/application/repositories/cures.repository.interface';
import { CreatedCure } from '@/src/entities/models/cure';
import { CuresRepository } from '@/src/infrastructure/repositories/cures.repository';

export async function updateCureUseCase(
  payload: UpdateCurePayload,
): Promise<CreatedCure> {
  return new CuresRepository().updateCure(payload);
}
