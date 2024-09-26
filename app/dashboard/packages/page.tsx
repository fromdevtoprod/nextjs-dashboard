import { fetchAllCustomers } from '@/app/lib/data/customers';
import {
  fetchAllPackages,
  fetchAppointmentTypesBySessionCount,
} from '@/app/lib/data/packages';
import { PackageTypesContainer } from './package-types-container';

export default async function PackagesPage() {
  const customers = await fetchAllCustomers();
  const initialPackages = await fetchAllPackages();
  const packageTypes = await fetchAppointmentTypesBySessionCount();
  console.log('customers', customers);
  console.log('initialPackages', initialPackages);
  console.log('packageTypes', packageTypes);
  return (
    <PackageTypesContainer
      customers={customers}
      initialPackages={initialPackages}
      packageTypes={packageTypes}
    />
  );
}
