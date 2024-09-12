import { SelectedCure } from '@/src/entities/models/cure';

export interface ICuresRepository {
  findAll(): Promise<SelectedCure[]>;
}
