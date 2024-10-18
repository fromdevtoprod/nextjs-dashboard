import { Appointment } from '@/src/entities/models/appointment';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export function findAppointmentByIdUseCase(id: string): Promise<Appointment> {
  return new AppointmentsRepository().findAppointmentById(id);
}
