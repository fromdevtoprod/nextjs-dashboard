import { AppointmentCreationUseCase } from '@/src/application/use-cases/appointments/create-appointment-use-case/appointment-creation.use-case';
import { describe, expect, it } from 'vitest';
import { PackagesRepositoryMock } from '../packages/packages.repository.mock';
import { AppointmentsRepositoryMock } from './appointments.repository.mock';
import { AppointmentTypesRepositoryMock } from '../appointment-types/appointment-types.repository.mock';
import { PaymentsRepositoryMock } from '../payments/payments.repository.mock';

const appointmentCreationUseCase = new AppointmentCreationUseCase(
  new AppointmentsRepositoryMock(),
  new AppointmentTypesRepositoryMock(),
  new PackagesRepositoryMock(),
  new PaymentsRepositoryMock(),
);

describe('Testing AppointmentCreationUseCase', () => {
  it('should create a simple appointment with no package', async () => {
    const newAppointment = {
      appointment_type_id: '1',
      customer_id: '1',
      date: '2021-12-12T12:00:00',
      is_package: false,
      payment: {
        method: 'CASH',
        status: 'PAID',
      },
    };
    const userId = '1';
    const createdAppointment = await appointmentCreationUseCase.create(
      newAppointment,
      userId,
    );
    expect(createdAppointment).toBeDefined();
    expect(createdAppointment?.id).toBeDefined();
    expect(createdAppointment?.package_id).toBeUndefined();
  });
});
