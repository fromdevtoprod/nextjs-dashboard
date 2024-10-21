import { fetchAllCustomers } from '@/app/lib/data/customers';
import {
  fetchAllPackages,
  fetchAppointmentTypesBySessionCount,
} from '@/app/lib/data/packages';
import { PackageTypesContainer } from './package-types-container';
import { auth } from '@/auth';

export default async function PackagesPage() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  const customers = await fetchAllCustomers(session.user.email);
  const initialPackages = await fetchAllPackages(session.user.email);
  const packageTypes = await fetchAppointmentTypesBySessionCount(
    session.user.email,
  );
  return (
    <PackageTypesContainer
      customers={customers}
      initialPackages={initialPackages}
      packageTypes={packageTypes}
      userEmail={session.user.email}
    />
  );
}
