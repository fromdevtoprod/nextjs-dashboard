import { countCompletedSessionsUseCase } from '@/src/application/use-cases/packages/count-completed-sessions.use-case';
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

export async function countCompletedSessions(): Promise<number> {
  try {
    const completedSessions = await countCompletedSessionsUseCase();
    return completedSessions;
  } catch (err) {
    console.error(
      'countCompletedSessions >> countCompletedSessionsUseCase :',
      err,
    );
    throw new Error('Failed to count completed sessions.');
  }
}
