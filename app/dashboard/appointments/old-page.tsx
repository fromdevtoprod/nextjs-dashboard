import { fetchAllCustomers } from '@/app/lib/data/customers';
import { UpcomingAppointments } from '@/components/upcoming-appointments';
import { AppointmentsCalendar } from '@/components/appointments-calendar';
import { AppointmentsHeader } from '@/components/appointments-header';

export default async function Appointments({
  searchParams,
}: {
  searchParams: { day?: string; month?: string; year?: string };
}) {
  const customers = await fetchAllCustomers();
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <AppointmentsHeader customers={customers} />

      <div className="grid gap-8 md:grid-cols-2">
        <AppointmentsCalendar />
        <UpcomingAppointments
          activeDay={getActiveDay(searchParams.day)}
          activeMonth={getActiveMonth(searchParams.month)}
          activeYear={getActiveYear(searchParams.year)}
        />
      </div>
    </main>
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
