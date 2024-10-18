import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';

export async function deleteAllPackagesByAppointmentTypeUseCase(
  appointmentTypeId: string,
) {
  return new PackagesRepository().deleteByAppointmentTypeId(appointmentTypeId);
}
