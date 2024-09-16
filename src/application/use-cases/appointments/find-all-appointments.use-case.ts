import { SelectedAppointment } from '@/src/entities/models/appointment';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export function findAllAppointmentsUseCase(): Promise<SelectedAppointment[]> {
  return new AppointmentsRepository().findAll();
}
