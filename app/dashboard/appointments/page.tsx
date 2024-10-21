import { fetchAllCustomers } from '@/app/lib/data/customers';
import { fetchAppointmentTypesWithRemainingSessions } from '@/app/lib/data/appointment-types';
import { fetchAllAppointmentsByDate } from '@/app/lib/data/appointments';
import { auth } from '@/auth';
import { AppointmentsContainer } from './appointments-container';

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: { day?: string; month?: string; year?: string };
}) {
  const activeDay = getActiveDay(searchParams.day);
  const activeMonth = getActiveMonth(searchParams.month);
  const activeYear = getActiveYear(searchParams.year);

  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  const [clients, appointmentsByDate] = await Promise.all([
    fetchAllCustomers(session.user.email),
    fetchAllAppointmentsByDate(
      { day: activeDay, month: activeMonth, year: activeYear },
      session.user.email,
    ),
  ]);
  const appointmentTypes = await fetchAppointmentTypesWithRemainingSessions(
    clients,
    session.user.email,
  );

  return (
    <AppointmentsContainer
      activeDay={activeDay}
      activeMonth={activeMonth}
      activeYear={activeYear}
      appointmentTypes={appointmentTypes}
      initialAppointments={appointmentsByDate}
      userEmail={session.user.email}
    />
  );
}

const getActiveDay = (day: string | undefined) =>
  !day ? getCurrentDay() : Number(day);

const getActiveMonth = (month: string | undefined) =>
  !month ? getCurrentMonth() : Number(month);

const getActiveYear = (year: string | undefined) =>
  !year ? getCurrentYear() : Number(year);

const getCurrentDay = () => new Date().getDate();

const getCurrentMonth = () => new Date().getMonth() + 1;

const getCurrentYear = () => new Date().getFullYear();
