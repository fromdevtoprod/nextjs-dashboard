import {
  CreatedPackage,
  SelectedPackage,
} from '@/src/entities/models/package-model';

export interface IPackagesRepository {
  countCompletedSessions(): Promise<number>;
  create(payload: CreatedPackage): Promise<SelectedPackage>;
  delete(id: string): Promise<void>;
  findAll(): Promise<SelectedPackage[]>;
  findById(id: string): Promise<SelectedPackage>;
}
