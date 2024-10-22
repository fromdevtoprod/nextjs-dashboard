import { CreateAppointmentPayload } from '@/src/application/repositories/appointments.repository.interface';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';
import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';
import { PaymentsRepository } from '@/src/infrastructure/repositories/payments.repository';
import { getUserIdUseCase } from '../../users/get-user-id.use-case';
import { AppointmentCreationUseCase } from './appointment-creation.use-case';

export async function createAppointmentUseCase(
  newAppointment: CreateAppointmentPayload,
  userEmail: string,
) {
  const userId = await getUserIdUseCase(userEmail);
  return new AppointmentCreationUseCase(
    new AppointmentsRepository(),
    new AppointmentTypesRepository(),
    new PackagesRepository(),
    new PaymentsRepository(),
  ).create(newAppointment, userId);
}
