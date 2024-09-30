import { SelectedPackage } from '@/src/entities/models/package-model';

export type CreatePackagePayload = {
  appointment_type_id: string;
  customer_id: string;
  remaining_sessions: number;
  start_date: string;
};

export interface IPackagesRepository {
  countCompletedSessions(): Promise<number>;
  create(payload: CreatePackagePayload): Promise<SelectedPackage>;
  delete(id: string): Promise<void>;
  findAll(): Promise<SelectedPackage[]>;
  findById(id: string): Promise<SelectedPackage>;
}
