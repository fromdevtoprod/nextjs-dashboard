import { fetchAllAppointmentTypes } from '@/app/lib/data/appointment-types';
import { getUserEmail } from '@/app/lib/auth-utils';
import { AppointmentTypesContainer } from './appointment-types-container';

export default async function AppointmentTypesPage() {
  const userEmail = await getUserEmail();
  const appointmentTypes = await fetchAllAppointmentTypes(userEmail);
  return (
    <AppointmentTypesContainer
      initialAppointmentTypes={appointmentTypes}
      userEmail={userEmail}
    />
  );
}
