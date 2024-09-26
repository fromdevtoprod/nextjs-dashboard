import { findAppointmentTypesBySessionCountController } from '@/src/interface-adapters/appointment-types/find-appointment-types-by-session-count.controller';

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
