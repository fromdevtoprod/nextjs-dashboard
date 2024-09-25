import { fetchAllAppointmentTypes } from '@/app/lib/data/appointment-types';
import { AppointmentsContainer } from './appointments-container';

export default async function AppointmentTypesPage() {
  const appointmentTypes = await fetchAllAppointmentTypes();
  return <AppointmentsContainer initialAppointmentTypes={appointmentTypes} />;
}
