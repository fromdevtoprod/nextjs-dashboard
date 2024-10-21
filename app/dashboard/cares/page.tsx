import { auth } from '@/auth';
import { fetchAllAppointmentTypes } from '@/app/lib/data/appointment-types';
import { AppointmentTypesContainer } from './appointment-types-container';

export default async function AppointmentTypesPage() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }
  const appointmentTypes = await fetchAllAppointmentTypes(session.user.email);
  return (
    <AppointmentTypesContainer
      initialAppointmentTypes={appointmentTypes}
      userEmail={session.user.email}
    />
  );
}
