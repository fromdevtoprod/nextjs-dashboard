import { deleteAppointmentTypeUseCase } from '@/src/application/use-cases/appointment-types/delete-appointment-type.use-case';
import { deleteAllAppointmentsByTypeUseCase } from '@/src/application/use-cases/appointments/delete-all-appointments-by-type.use-case';
import { deleteAllPackagesByAppointmentTypeUseCase } from '@/src/application/use-cases/packages/delete-all-packages-by-appointment-type.use-case';

export async function deleteAppointmentTypeController(id: string) {
  await deleteAllPackagesByAppointmentTypeUseCase(id);
  await deleteAllAppointmentsByTypeUseCase(id);
  return deleteAppointmentTypeUseCase(id);
}
