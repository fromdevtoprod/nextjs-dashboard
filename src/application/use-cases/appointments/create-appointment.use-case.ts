import { AppointmentsRepository } from '../../../infrastructure/repositories/appointments.repository';
import { CreateAppointmentPayload } from '../../repositories/appointments.repository.interface';
import { UpcomingAppointment } from '../../../entities/models/appointment';
import { PackagesRepository } from '../../../infrastructure/repositories/packages.repository';
import { AppointmentTypesRepository } from '../../../infrastructure/repositories/appointment-types.repository';
import { createPaymentUseCase } from '../payments/create-payment.use-case';

export async function createAppointmentUseCase(
  payload: CreateAppointmentPayload,
): Promise<UpcomingAppointment> {
  if (!payload.is_package) {
    const createdAppointment = await createAppointment(payload);
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

  if (payload.package_id) {
    const existingPackage = await new PackagesRepository().findById(
      payload.package_id,
    );
    if (existingPackage && existingPackage.remaining_sessions > 0) {
      await new PackagesRepository().updateRemainingSessions({
        id: existingPackage.id,
        remaining_sessions: existingPackage.remaining_sessions - 1,
      });
      const createdAppointment = await createAppointment({
        ...payload,
        package_id: existingPackage.id,
      });
      return {
        ...createdAppointment,
        ...getDateTime(createdAppointment.date),
      };
    }
  }

  const startedPackage = await new PackagesRepository().create({
    appointment_type_id: payload.appointment_type_id,
    customer_id: payload.customer_id,
    remaining_sessions: appointmentType.session_count - 1,
    start_date: new Date(payload.date).toISOString(),
  });
  const createdAppointment = await createAppointment({
    ...payload,
    package_id: startedPackage.id,
  });
  return {
    ...createdAppointment,
    ...getDateTime(createdAppointment.date),
  };
}

async function createAppointment(payload: CreateAppointmentPayload) {
  const createdAppointment =
    await new AppointmentsRepository().createAppointment(payload);
  await createPaymentUseCase({
    amount: `${createdAppointment.appointment_type_price}`,
    appointmentId: createdAppointment.id,
    customerId: payload.customer_id,
    date: createdAppointment.date, //new Date().toISOString(),
    packageId: payload.package_id,
    status: payload.payment.status,
    method: payload.payment.method,
  });
  return createdAppointment;
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
