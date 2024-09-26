import {
  CreatedPackage,
  SelectedPackage,
} from '@/src/entities/models/package-model';

export interface IPackagesRepository {
  create(payload: CreatedPackage): Promise<SelectedPackage>;
  findAll(): Promise<SelectedPackage[]>;
  findById(id: string): Promise<SelectedPackage>;
}
