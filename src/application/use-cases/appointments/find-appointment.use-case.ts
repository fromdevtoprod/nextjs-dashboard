import { SelectedAppointment } from '@/src/entities/models/appointment';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export function findAppointmentByIdUseCase(
  id: string,
): Promise<SelectedAppointment> {
  return new AppointmentsRepository().findAppointmentById(id);
}
