import { PackageModel } from '@/src/entities/models/package-model';
import { IPackagesRepository } from '../../repositories/packages.repository.interface';

export class PackageFindByIdUseCase {
  constructor(private repository: IPackagesRepository) {}

  public async find(packageId: string) {
    const foundPackage = await this.repository.findById(packageId);
    if (!foundPackage) {
      return null;
    }
    return new PackageModel(foundPackage);
  }
}
