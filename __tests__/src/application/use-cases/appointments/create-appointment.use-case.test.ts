import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppointmentsRepository } from '../../../../../src/infrastructure/repositories/appointments.repository';

describe('CreateAppointmentUseCase', () => {
  let appRepository: AppointmentsRepository;

  beforeEach(() => {
    appRepository = new AppointmentsRepository();
    appRepository.createAppointment = vi.fn().mockResolvedValue({
      id: '1',
      appointment_type_id: '1',
      customer_id: '1',
      date: '2022-01-01T12:00:00',
    });
  });

  it('should create a new appointment', async () => {
    // Arrange
    const payload = {
      appointment_type_id: '1',
      customer_id: '1',
      date: '2022-01-01',
      time: '12:00',
    };

    // Act
    const createdAppointment = await appRepository.createAppointment(payload);

    // Assert
    expect(createdAppointment).toEqual({
      id: '1',
      appointment_type_id: '1',
      customer_id: '1',
      date: '2022-01-01T12:00:00',
    });
  });

  it.todo('should create a package when appointment type is a package');
});
