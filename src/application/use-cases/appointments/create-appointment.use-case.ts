import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { CreateAppointmentPayload } from '../../repositories/appointments.repository.interface';
import { UpcomingAppointment } from '@/src/entities/models/appointment';

const appRepository = new AppointmentsRepository();

export async function createAppointmentUseCase(
  payload: CreateAppointmentPayload,
): Promise<UpcomingAppointment> {
  const createdAppointment = await appRepository.createAppointment(payload);
  return {
    ...createdAppointment,
    ...getDateTime(createdAppointment.date),
  };
}

function getDateTime(date: string) {
  return {
    date: new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    time: new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
  };
}
