import { updateAppointmentTypeUseCase } from '@/src/application/use-cases/appointment-types/update-appointment-type.use-case';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';

export async function updateAppointmentTypeController(
  payload: SelectedAppointmentType,
) {
  return updateAppointmentTypeUseCase(payload);
}
