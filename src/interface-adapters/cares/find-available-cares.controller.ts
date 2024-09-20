import {
  FindAvailableCaresPayload,
  findAvailableCaresUseCase,
} from '@/src/application/use-cases/cares/find-available-cares.use-case';

export async function findAvailableCaresController(
  payload: FindAvailableCaresPayload,
) {
  return findAvailableCaresUseCase(payload);
}
