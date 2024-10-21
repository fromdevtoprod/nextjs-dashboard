import { fetchAllCustomers } from '@/app/lib/data/customers';
import {
  fetchAllPackages,
  fetchAppointmentTypesBySessionCount,
} from '@/app/lib/data/packages';
import { getUserEmail } from '@/app/lib/auth-utils';
import { PackageTypesContainer } from './package-types-container';

export default async function PackagesPage() {
  const userEmail = await getUserEmail();

  const [customers, initialPackages, packageTypes] =
    await fetchPackageData(userEmail);
  return (
    <PackageTypesContainer
      customers={customers}
      initialPackages={initialPackages}
      packageTypes={packageTypes}
      userEmail={userEmail}
    />
  );
}

function fetchPackageData(userEmail: string) {
  return Promise.all([
    fetchAllCustomers(userEmail),
    fetchAllPackages(userEmail),
    fetchAppointmentTypesBySessionCount(userEmail),
  ]);
}
