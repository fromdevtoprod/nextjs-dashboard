import { findAppointmentTypesBySessionCountController } from '@/src/interface-adapters/appointment-types/find-appointment-types-by-session-count.controller';
import { findAllPackagesController } from '@/src/interface-adapters/packages/find-all-packages.controller';

export async function fetchAppointmentTypesBySessionCount() {
  try {
    const packageTypes = await findAppointmentTypesBySessionCountController();
    return packageTypes;
  } catch (err) {
    console.error(
      'fetchAllPackageTypes >> findAllPackageTypesController :',
      err,
    );
    throw new Error('Failed to fetch all package types.');
  }
}

export async function fetchAllPackages() {
  try {
    const packages = await findAllPackagesController();
    return packages;
  } catch (err) {
    console.error('fetchAllPackages >> findAllPackagesController :', err);
    throw new Error('Failed to fetch all packages.');
  }
}
