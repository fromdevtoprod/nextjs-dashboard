import { deleteAppointmentTypeUseCase } from '@/src/application/use-cases/appointment-types/delete-appointment-type.use-case';

export async function deleteAppointmentTypeController(id: string) {
  return deleteAppointmentTypeUseCase(id);
}
