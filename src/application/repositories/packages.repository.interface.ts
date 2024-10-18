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
  create(payload: CreatePackagePayload): Promise<any>;
  delete(id: string): Promise<void>;
  deleteByAppointmentTypeId(appointmentTypeId: string): Promise<void>;
  deleteByCustomerId(customerId: string): Promise<void>;
  findAll(): Promise<SelectedPackage[]>;
  findAllUncompletedPackages(): Promise<SelectedPackage[]>;
  findById(id: string): Promise<any>;
  findExistingPackage(
    customer_id: string,
    appointment_type_id: string,
  ): Promise<SelectedPackage | null>;
  updateRemainingSessions(
    payload: UpdatePackagePayload,
  ): Promise<SelectedPackage>;
}
