import {
  CreatePackagePayload,
  IPackagesRepository,
  UpdatePackagePayload,
} from '@/src/application/repositories/packages.repository.interface';
import { Package } from '@/src/entities/models/package-model';

const PACKAGES = [
  {
    id: '1',
    appointmentType: {
      id: '1',
      duration: 60,
      name: 'name',
      price: 100,
      session_count: 1,
    },
    appointmentTypeId: '1',
    customer: {
      id: '1',
      address: 'address',
      birth_date: new Date().toISOString(),
      city: 'city',
      created_at: new Date(),
      name: 'name',
      email: 'email',
      pathology: 'pathology',
      phone: 'phone',
      postal_code: 'postal_code',
    },
    customerId: '1',
    remaining_sessions: 1,
    start_date: new Date(),
  },
];

export class PackagesRepositoryMock implements IPackagesRepository {
  public async countCompletedSessions(userId: string) {
    return 1;
  }

  public async create(
    payload: CreatePackagePayload,
    userId: string,
  ): Promise<Package | null> {
    return PACKAGES[0];
  }

  public async delete(id: string) {
    return;
  }

  public async deleteByAppointmentTypeId(appointmentTypeId: string) {
    return;
  }

  public async deleteByCustomerId(customerId: string) {
    return;
  }

  public async findAll(userId: string) {
    return PACKAGES;
  }

  public async findAllUncompletedPackages() {
    return PACKAGES;
  }

  public async findById(packageId: string) {
    return PACKAGES.find((p) => p.id === packageId) || null;
  }

  public async findExistingPackage(
    customer_id: string,
    appointment_type_id: string,
  ) {
    return PACKAGES[0];
  }

  public async updateRemainingSessions(
    payload: UpdatePackagePayload,
  ): Promise<Package | null> {
    return {
      ...PACKAGES[0],
      id: payload.id,
      remaining_sessions: payload.remaining_sessions,
    };
  }
}
