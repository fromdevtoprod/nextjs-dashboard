import { fetchAllCustomers } from '@/app/lib/data/customers';
import { fetchAppointmentTypesWithRemainingSessions } from '@/app/lib/data/appointment-types';
import { fetchAllAppointmentsByDate } from '@/app/lib/data/appointments';
import { getUserEmail } from '@/app/lib/auth-utils';
import { AppointmentsContainer } from './appointments-container';

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: { day?: string; month?: string; year?: string };
}) {
  const userEmail = await getUserEmail();
  const activeDay = getActiveDay(searchParams.day);
  const activeMonth = getActiveMonth(searchParams.month);
  const activeYear = getActiveYear(searchParams.year);

  const [clients, appointmentsByDate] = await Promise.all([
    fetchAllCustomers(userEmail),
    fetchAllAppointmentsByDate(
      { day: activeDay, month: activeMonth, year: activeYear },
      userEmail,
    ),
  ]);
  const appointmentTypes = await fetchAppointmentTypesWithRemainingSessions(
    clients,
    userEmail,
  );

  return (
    <AppointmentsContainer
      activeDay={activeDay}
      activeMonth={activeMonth}
      activeYear={activeYear}
      appointmentTypes={appointmentTypes}
      initialAppointments={appointmentsByDate}
      userEmail={userEmail}
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
