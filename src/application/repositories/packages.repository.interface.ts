import { SelectedPackage } from '@/src/entities/models/package-model';

export type CreatePackagePayload = {
  appointment_type_id: string;
  customer_id: string;
  remaining_sessions: number;
  start_date: string;
};

export type UpdatePackagePayload = { id: string; remaining_sessions: number };

export interface IPackagesRepository {
  countCompletedSessions(): Promise<number>;
  create(payload: CreatePackagePayload): Promise<SelectedPackage>;
  delete(id: string): Promise<void>;
  findAll(): Promise<SelectedPackage[]>;
  findAllUncompletedPackages(): Promise<SelectedPackage[]>;
  findById(id: string): Promise<SelectedPackage>;
  findExistingPackage(
    customer_id: string,
    appointment_type_id: string,
  ): Promise<SelectedPackage | null>;
  update(payload: UpdatePackagePayload): Promise<SelectedPackage>;
}
