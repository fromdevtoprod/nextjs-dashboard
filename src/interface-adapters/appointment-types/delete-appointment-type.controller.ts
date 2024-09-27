import { deleteAppointmentTypeUseCase } from '@/src/application/use-cases/appointment-types/delete-appointment-type.use-case';
import { deleteAllAppointmentsWithThisType } from '@/src/application/use-cases/appointments/delete-all-appointments-by-type.use-case';

export async function deleteAppointmentTypeController(id: string) {
  await deleteAllAppointmentsWithThisType(id);
  return deleteAppointmentTypeUseCase(id);
}
