import { fetchAllAppointmentTypes } from '@/app/lib/data/appointment-types';
import { AppointmentTypesContainer } from './appointment-types-container';

export default async function AppointmentTypesPage() {
  const appointmentTypes = await fetchAllAppointmentTypes();
  return (
    <AppointmentTypesContainer initialAppointmentTypes={appointmentTypes} />
  );
}
