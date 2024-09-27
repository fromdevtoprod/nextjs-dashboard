import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';

export async function deleteAllPackagesByAppointmentTypeUseCase(
  appointmentTypeId: string,
) {
  const allPackages = await new PackagesRepository().findAll();
  const packagesWithThisType = allPackages.filter(
    (pack) => pack.appointment_type_id === appointmentTypeId,
  );
  const allPromises: Promise<void>[] = [];
  packagesWithThisType.forEach(async (pack) => {
    allPromises.push(new PackagesRepository().delete(pack.id));
  });
  return Promise.all(allPromises);
}
