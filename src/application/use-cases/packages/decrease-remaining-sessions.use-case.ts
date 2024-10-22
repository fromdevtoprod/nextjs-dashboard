import { PackageModel } from '@/src/entities/models/package-model';
import { IPackagesRepository } from '../../repositories/packages.repository.interface';

export class RemainingSessionsDecreaseUseCase {
  constructor(private repository: IPackagesRepository) {}

  public async decrease(packageModel: PackageModel) {
    if (!packageModel.hasRemainingSessions()) {
      return packageModel;
    }
    const updatedPackage = await this.repository.updateRemainingSessions({
      id: packageModel.getId(),
      remaining_sessions: packageModel.decreaseRemainingSessions(),
    });
    if (!updatedPackage) {
      console.error('An error occurred while updating the package');
      return null;
    }
    return new PackageModel(updatedPackage);
  }
}
