import { AppointmentsRepository } from '../../../infrastructure/repositories/appointments.repository';
import { CreateAppointmentPayload } from '../../repositories/appointments.repository.interface';
import { UpcomingAppointment } from '../../../entities/models/appointment';
import { PackagesRepository } from '../../../infrastructure/repositories/packages.repository';
import { AppointmentTypesRepository } from '../../../infrastructure/repositories/appointment-types.repository';

const appRepository = new AppointmentsRepository();

export async function createAppointmentUseCase(
  payload: CreateAppointmentPayload,
): Promise<UpcomingAppointment> {
  const createdAppointment = await appRepository.createAppointment(payload);
  if (!payload.is_package) {
    return {
      ...createdAppointment,
      ...getDateTime(createdAppointment.date),
    };
  }

  const appointmentType = await new AppointmentTypesRepository().findById(
    payload.appointment_type_id,
  );
  if (!appointmentType) {
    throw new Error('Appointment type not found');
  }

  await new PackagesRepository().create({
    appointment_type_id: payload.appointment_type_id,
    customer_id: payload.customer_id,
    remaining_sessions: appointmentType.session_count - 1,
    start_date: new Date(payload.date).toISOString(),
  });
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
