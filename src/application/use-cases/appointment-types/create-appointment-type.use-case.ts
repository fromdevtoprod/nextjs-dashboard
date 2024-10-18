import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';
import { CreatedAppointmentTypePayload } from '../../repositories/appointment-types.repository.interface';

const appointmentTypesRepository = new AppointmentTypesRepository();

export async function createAppointmentTypeUseCase(
  payload: CreatedAppointmentTypePayload,
) {
  return appointmentTypesRepository.create(payload);
}
