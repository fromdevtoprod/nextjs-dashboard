import { CreatedCure } from '@/src/entities/models/cure';
import { CuresRepository } from '@/src/infrastructure/repositories/cures.repository';
import { CreateCurePayload } from '@/src/application/repositories/cures.repository.interface';

export async function createCureUseCase(
  data: CreateCurePayload,
): Promise<CreatedCure> {
  return new CuresRepository().createCure(data);
}
