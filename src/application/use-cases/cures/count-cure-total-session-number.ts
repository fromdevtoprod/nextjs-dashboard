import { CuresRepository } from '@/src/infrastructure/repositories/cures.repository';

export async function countCureTotalSessionNumberUseCase(
  cureId: string,
): Promise<number> {
  return new CuresRepository().countCureTotalSessionNumber(cureId);
}
