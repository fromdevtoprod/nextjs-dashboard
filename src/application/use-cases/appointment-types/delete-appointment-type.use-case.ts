import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';
import { deleteAllPackagesByAppointmentTypeUseCase } from '../packages/delete-all-packages-by-appointment-type.use-case';
import { deleteAllAppointmentsByTypeUseCase } from '../appointments/delete-all-appointments-by-type.use-case';

export async function deleteAppointmentTypeUseCase(id: string) {
  await deleteAllPackagesByAppointmentTypeUseCase(id);
  await deleteAllAppointmentsByTypeUseCase(id);
  return new AppointmentTypesRepository().delete(id);
}
