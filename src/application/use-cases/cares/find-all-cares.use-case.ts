import { SelectedCare } from '@/src/entities/models/care';
import { CaresRepository } from '@/src/infrastructure/repositories/cares.repository';

export function findAllCaresUseCase(): Promise<SelectedCare[]> {
  const caresRepository = new CaresRepository();
  return caresRepository.findAll();
}
