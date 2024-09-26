import { fetchAppointmentTypesBySessionCount } from '@/app/lib/data/packages';
import { PackagesContainer } from './packages-container';

export default async function PackagesPage() {
  const packageTypes = await fetchAppointmentTypesBySessionCount();
  console.log('packageTypes', packageTypes);
  return <PackagesContainer packageTypes={packageTypes} />;
}
