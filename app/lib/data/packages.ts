import { findAppointmentTypesBySessionCountUseCase } from '@/src/application/use-cases/appointment-types/find-appointment-types-by-session-count.use-case';
import { countCompletedSessionsUseCase } from '@/src/application/use-cases/packages/count-completed-sessions.use-case';
import { findAllPackagesUseCase } from '@/src/application/use-cases/packages/find-all-packages.use-case';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { SelectedPackage } from '@/src/entities/models/package-model';

export async function fetchAppointmentTypesBySessionCount(): Promise<
  SelectedAppointmentType[]
> {
  try {
    const packageTypes = await findAppointmentTypesBySessionCountUseCase();
    return packageTypes;
  } catch (err) {
    console.error(
      'fetchAllPackageTypes >> findAppointmentTypesBySessionCountUseCase :',
      err,
    );
    return [];
  }
}

export async function fetchAllPackages(): Promise<SelectedPackage[]> {
  try {
    const packages = await findAllPackagesUseCase();
    return packages;
  } catch (err) {
    console.error('fetchAllPackages >> findAllPackagesUseCase :', err);
    return [];
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
    return 0;
  }
}
