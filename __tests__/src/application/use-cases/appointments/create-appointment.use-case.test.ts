import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppointmentsRepository } from '../../../../../src/infrastructure/repositories/appointments.repository';
import { PackagesRepository } from '../../../../../src/infrastructure/repositories/packages.repository';
import { createAppointmentUseCase } from '../../../../../src/application/use-cases/appointments/create-appointment.use-case';
import { AppointmentTypesRepository } from '../../../../../src/infrastructure/repositories/appointment-types.repository';

describe('CreateAppointmentUseCase', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create a new appointment', async () => {
    vi.spyOn(
      AppointmentsRepository.prototype,
      'createAppointment',
    ).mockResolvedValue({
      appointment_type_name: 'Appointment 1',
      client_name: 'Client 1',
      date: '2022-01-01T12:00:00.000Z',
      id: '1',
      session_count: 1,
      time: '',
    });

    // Act
    const createdAppointment = await createAppointmentUseCase({
      appointment_type_id: '1',
      customer_id: '1',
      date: '2022-01-01T12:00:00.000Z',
      is_package: false,
    });

    // Assert
    expect(createdAppointment).toEqual({
      appointment_type_name: 'Appointment 1',
      client_name: 'Client 1',
      date: '01/01/2022',
      id: '1',
      session_count: 1,
      time: '1:00 PM',
    });
  });

  it('should create a package when appointment type is a package', async () => {
    vi.spyOn(
      AppointmentsRepository.prototype,
      'createAppointment',
    ).mockResolvedValue({
      appointment_type_name: 'Appointment 1',
      client_name: 'Client 1',
      date: '2022-01-01T12:00:00.000Z',
      id: '1',
      session_count: 1,
      time: '',
    });

    vi.spyOn(
      AppointmentTypesRepository.prototype,
      'findById',
    ).mockResolvedValue({
      id: '1',
      duration: 30,
      name: 'Package 1',
      price: 100,
      session_count: 10,
    });

    const createFromPackagesRepository = vi
      .spyOn(PackagesRepository.prototype, 'create')
      .mockResolvedValue({
        name: 'Package 1',
        total_sessions: 10,
        customer_name: 'Client 1',
        appointment_type_id: '1',
        customer_id: '1',
        id: '1',
        remaining_sessions: 10,
        start_date: '2022-01-01T12:00:00',
      });

    // Act
    await createAppointmentUseCase({
      appointment_type_id: '1',
      customer_id: '1',
      date: '2022-01-01T12:00:00.000Z',
      is_package: true,
    });

    // Assert
    expect(createFromPackagesRepository).toHaveBeenCalledWith({
      appointment_type_id: '1',
      customer_id: '1',
      remaining_sessions: 9,
      start_date: '2022-01-01T12:00:00.000Z',
    });
  });
});
