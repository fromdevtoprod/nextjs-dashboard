import { Suspense } from 'react';
import Calendar from '@/app/ui/appointments/calendar';
import { lusitana } from '@/app/ui/fonts';
import { AppointmentsCalendarSkeleton } from '@/app/ui/appointments/skeletons';

const getMonth = (month: string | undefined) =>
  !month ? getCurrentMonth() : Number(month);

const getYear = (year: string | undefined) =>
  !year ? getCurrentYear() : Number(year);

const getCurrentMonth = () => new Date().getMonth();

const getCurrentYear = () => new Date().getFullYear();

export default function Page({
  searchParams,
}: {
  searchParams: { month?: string; year?: string };
}) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Appointments</h1>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Suspense fallback={<AppointmentsCalendarSkeleton />}>
          <Calendar
            month={getMonth(searchParams.month)}
            year={getYear(searchParams.year)}
          />
        </Suspense>
      </div>
    </div>
  );
}
