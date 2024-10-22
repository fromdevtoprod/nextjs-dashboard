import { describe, expect, it } from 'vitest';
import { AppointmentAndPaymentCreationUseCase } from '@/src/application/use-cases/appointments/create-appointment-use-case/create-appointment-and-payment.use-case';
import { AppointmentsRepositoryMock } from './appointments.repository.mock';
import { PaymentsRepositoryMock } from '../payments/payments.repository.mock';

const appointmentAndPaymentCreationUseCase =
  new AppointmentAndPaymentCreationUseCase(
    new AppointmentsRepositoryMock(),
    new PaymentsRepositoryMock(),
  );

describe('Testing AppointmentAndPaymentCreationUseCase', () => {
  it('should create an appointment and a payment', async () => {
    const createdAppointment =
      await appointmentAndPaymentCreationUseCase.create(
        {
          appointment_type_id: '1',
          customer_id: '1',
          date: '2021-09-01',
          is_package: false,
          package_id: '',
          payment: {
            method: 'credit_card',
            status: 'paid',
          },
        },
        '1',
      );

    expect(createdAppointment).toBeDefined();
    expect(createdAppointment?.id).toBe('1');
  });

  it('should rollback appointment creation when payment creation fails', async () => {
    try {
      const createdAppointment =
        await appointmentAndPaymentCreationUseCase.create(
          // @ts-ignore
          {},
          '1',
        );
      expect(createdAppointment).toBeUndefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
