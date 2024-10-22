import { describe, expect, it } from 'vitest';
import { PackageModel } from '@/src/entities/models/package-model';
import { RemainingSessionsDecreaseUseCase } from '@/src/application/use-cases/packages/decrease-remaining-sessions.use-case';
import { PackagesRepositoryMock } from './packages.repository.mock';

const remainingSessionsDecreaseUseCase = new RemainingSessionsDecreaseUseCase(
  new PackagesRepositoryMock(),
);

describe('DecreaseRemainingSessionsUseCase', () => {
  it('should decrease remaining sessions when there are remaining sessions', async () => {
    const packageModel = new PackageModel({
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
    });
    const updatedPackage =
      await remainingSessionsDecreaseUseCase.decrease(packageModel);
    expect(updatedPackage).toBeDefined();
    expect(updatedPackage?.getRemainingSessions()).toBe(0);
  });

  it('should not decrease remaining sessions when there are no remaining sessions', async () => {
    const packageModel = new PackageModel({
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
      remaining_sessions: 0,
      start_date: new Date(),
    });
    const updatedPackage =
      await remainingSessionsDecreaseUseCase.decrease(packageModel);
    expect(updatedPackage).toBeDefined();
    expect(updatedPackage?.getRemainingSessions()).toBe(0);
  });
});
