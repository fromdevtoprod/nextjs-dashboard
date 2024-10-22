import {
  CreateAppointmentPayload,
  IAppointmentsRepository,
} from '@/src/application/repositories/appointments.repository.interface';
import { Appointment } from '@/src/entities/models/appointment';

export class AppointmentsRepositoryMock implements IAppointmentsRepository {
  async countAllUpcomingAppointments(userId: string): Promise<number> {
    return 1;
  }

  async countLastYearAppointments(userId: string): Promise<number> {
    return 1;
  }

  async createAppointment(
    payload: CreateAppointmentPayload,
    userId: string,
  ): Promise<Appointment> {
    return {
      id: '1',
      appointmentType: {
        id: payload.appointment_type_id,
        name: 'name',
        duration: 30,
        price: 30,
        session_count: 1,
      },
      appointmentTypeId: payload.appointment_type_id,
      customerId: payload.customer_id,
      date: new Date(payload.date),
      notes: [],
      packageId: payload.package_id || '',
      payments: [],
    };
  }

  async deleteAppointment(appointmentId: string): Promise<void> {
    return;
  }

  async deleteByAppointmentTypeId(appointmentTypeId: string): Promise<void> {
    return;
  }

  async deleteByCustomerId(customerId: string): Promise<void> {
    return;
  }

  async findAllAppointments(): Promise<Appointment[]> {
    return [
      {
        id: '1',
        appointmentType: {
          id: '1',
          name: 'name',
          duration: 30,
          price: 30,
          session_count: 1,
        },
        appointmentTypeId: '1',
        customerId: '1',
        date: new Date(),
        notes: [],
        packageId: '',
        payments: [],
      },
    ];
  }

  async findAllAppointmentsByCustomer(
    customerId: string,
  ): Promise<Appointment[]> {
    return [
      {
        id: '1',
        appointmentType: {
          id: '1',
          name: 'name',
          duration: 30,
          price: 30,
          session_count: 1,
        },
        appointmentTypeId: '1',
        customerId: '1',
        date: new Date(),
        notes: [],
        packageId: '',
        payments: [],
      },
    ];
  }

  async findAllAppointmentsByDate(): Promise<Appointment[]> {
    return [
      {
        id: '1',
        appointmentType: {
          id: '1',
          name: 'name',
          duration: 30,
          price: 30,
          session_count: 1,
        },
        appointmentTypeId: '1',
        customerId: '1',
        date: new Date(),
        notes: [],
        packageId: '',
        payments: [],
      },
    ];
  }

  async findAppointmentById(
    appointmentId: string,
  ): Promise<Appointment | null> {
    return {
      id: '1',
      appointmentType: {
        id: '1',
        name: 'name',
        duration: 30,
        price: 30,
        session_count: 1,
      },
      appointmentTypeId: '1',
      customerId: '1',
      date: new Date(),
      notes: [],
      packageId: '',
      payments: [],
    };
  }
}
