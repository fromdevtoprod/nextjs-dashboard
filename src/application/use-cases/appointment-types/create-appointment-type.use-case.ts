import { CreatedAppointmentType } from '@/src/entities/models/appointment-types';
import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';

const appointmentTypesRepository = new AppointmentTypesRepository();

export async function createAppointmentTypeUseCase(
  payload: CreatedAppointmentType,
) {
  return appointmentTypesRepository.create(payload);
}
