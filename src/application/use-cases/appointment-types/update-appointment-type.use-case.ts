import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';

const appointmentTypesRepository = new AppointmentTypesRepository();

export async function updateAppointmentTypeUseCase(
  payload: SelectedAppointmentType,
) {
  return appointmentTypesRepository.update(payload);
}
