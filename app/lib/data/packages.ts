import { findAppointmentTypesBySessionCountUseCase } from '@/src/application/use-cases/appointment-types/find-appointment-types-by-session-count.use-case';
import { countCompletedSessionsUseCase } from '@/src/application/use-cases/packages/count-completed-sessions.use-case';
import { findAllPackagesUseCase } from '@/src/application/use-cases/packages/find-all-packages.use-case';

export async function fetchAppointmentTypesBySessionCount() {
  try {
    const packageTypes = await findAppointmentTypesBySessionCountUseCase();
    return packageTypes;
  } catch (err) {
    console.error(
      'fetchAllPackageTypes >> findAppointmentTypesBySessionCountUseCase :',
      err,
    );
    throw new Error('Failed to fetch all package types.');
  }
}

export async function fetchAllPackages() {
  try {
    const packages = await findAllPackagesUseCase();
    return packages;
  } catch (err) {
    console.error('fetchAllPackages >> findAllPackagesUseCase :', err);
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
