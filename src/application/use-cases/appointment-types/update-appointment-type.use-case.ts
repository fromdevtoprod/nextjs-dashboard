import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';
import { UpdateAppointmentTypePayload } from '../../repositories/appointment-types.repository.interface';

const appointmentTypesRepository = new AppointmentTypesRepository();

export async function updateAppointmentTypeUseCase(
  payload: UpdateAppointmentTypePayload,
) {
  return appointmentTypesRepository.update(payload);
}
