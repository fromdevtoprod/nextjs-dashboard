import { AppointmentsRepository } from '../../../infrastructure/repositories/appointments.repository';
import { CreateAppointmentPayload } from '../../repositories/appointments.repository.interface';
import { PackagesRepository } from '../../../infrastructure/repositories/packages.repository';
import { AppointmentTypesRepository } from '../../../infrastructure/repositories/appointment-types.repository';
import { createPaymentUseCase } from '../payments/create-payment.use-case';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function createAppointmentUseCase(
  payload: CreateAppointmentPayload,
  userEmail: string,
): Promise<any> {
  const userId = await getUserIdUseCase(userEmail);
  if (!userId) {
    throw new Error('User not found');
  }

  if (!payload.is_package) {
    const createdAppointment = await createAppointment(payload, userId);
    return {
      ...createdAppointment,
      ...getDateTime(createdAppointment?.date),
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
      const createdAppointment = await createAppointment(
        {
          ...payload,
          package_id: existingPackage.id,
        },
        userId,
      );
      return {
        ...createdAppointment,
        ...getDateTime(createdAppointment?.date),
      };
    }
  }

  const startedPackage = await new PackagesRepository().create(
    {
      appointment_type_id: payload.appointment_type_id,
      customer_id: payload.customer_id,
      remaining_sessions: appointmentType.session_count - 1,
      start_date: new Date(payload.date).toISOString(),
    },
    userId,
  );
  const createdAppointment = await createAppointment(
    {
      ...payload,
      package_id: startedPackage?.id,
    },
    userId,
  );
  return {
    ...createdAppointment,
    ...getDateTime(createdAppointment?.date),
  };
}

async function createAppointment(
  payload: CreateAppointmentPayload,
  userId: string,
) {
  const createdAppointment =
    await new AppointmentsRepository().createAppointment(payload, userId);
  await createPaymentUseCase(
    {
      amount: `${createdAppointment?.appointmentType.price}`,
      appointmentId: createdAppointment?.id || '',
      customerId: payload.customer_id,
      date: createdAppointment?.date.toISOString() || '', //new Date().toISOString(),
      packageId: payload.package_id,
      status: payload.payment.status,
      method: payload.payment.method,
    },
    userId,
  );
  return createdAppointment;
}

function getDateTime(date: Date = new Date()) {
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
