import { Suspense } from 'react';
import Calendar from '@/app/ui/appointments/calendar';
import { lusitana } from '@/app/ui/fonts';
import { AppointmentsCalendarSkeleton } from '@/app/ui/appointments/skeletons';

const getActiveDay = (day: string | undefined) =>
  !day ? getCurrentDay() : Number(day);

const getActiveMonth = (month: string | undefined) =>
  !month ? getCurrentMonth() : Number(month);

const getActiveYear = (year: string | undefined) =>
  !year ? getCurrentYear() : Number(year);

const getCurrentDay = () => new Date().getDate();

const getCurrentMonth = () => new Date().getMonth() + 1;

const getCurrentYear = () => new Date().getFullYear();

export default function Page({
  searchParams,
}: {
  searchParams: { day?: string; month?: string; year?: string };
}) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Appointments</h1>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Suspense fallback={<AppointmentsCalendarSkeleton />}>
          <Calendar
            activeDay={getActiveDay(searchParams.day)}
            activeMonth={getActiveMonth(searchParams.month)}
            activeYear={getActiveYear(searchParams.year)}
          />
        </Suspense>
      </div>
    </div>
  );
}
