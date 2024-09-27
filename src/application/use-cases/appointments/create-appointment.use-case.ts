import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { CreateAppointmentPayload } from '../../repositories/appointments.repository.interface';
import { UpcomingAppointment } from '@/src/entities/models/appointment';

export async function createAppointmentUseCase(
  payload: CreateAppointmentPayload,
): Promise<UpcomingAppointment> {
  const createdAppointment =
    await new AppointmentsRepository().createAppointment(payload);
  return {
    ...createdAppointment,
    date: new Date(createdAppointment.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    time: new Date(createdAppointment.date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
  };
}
