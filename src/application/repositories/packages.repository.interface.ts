import { Package } from '@/src/entities/models/package-model';

export type CreatePackagePayload = {
  appointment_type_id: string;
  customer_id: string;
  remaining_sessions: number;
  start_date: string;
};

export type UpdatePackagePayload = { id: string; remaining_sessions: number };

export interface IPackagesRepository {
  countCompletedSessions(userId: string): Promise<number>;
  create(
    payload: CreatePackagePayload,
    userId: string,
  ): Promise<Package | null>;
  delete(id: string): Promise<void>;
  deleteByAppointmentTypeId(appointmentTypeId: string): Promise<void>;
  deleteByCustomerId(customerId: string): Promise<void>;
  findAll(userId: string): Promise<Package[]>;
  findAllUncompletedPackages(): Promise<Package[]>;
  findById(id: string): Promise<any>;
  findExistingPackage(
    customer_id: string,
    appointment_type_id: string,
  ): Promise<Package | null>;
  updateRemainingSessions(
    payload: UpdatePackagePayload,
  ): Promise<Package | null>;
}
