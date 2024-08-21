import { fetchAppointments } from '@/app/lib/data/appointments';
import ActiveMonth from './active-month';
import PreviousMonthArrow from './previous-month';
import NextMonthArrow from './next-month';
import TableBody from './tbody';
import TableHead from './thead';
import ActiveDayAppointments from './active-day-appointments';
import { BookAppointmentButton } from '../buttons';

export default async function Calendar({
  activeDay,
  activeMonth,
  activeYear,
}: {
  activeDay: number;
  activeMonth: number;
  activeYear: number;
}) {
  const appointments = await fetchAppointments(
    activeDay,
    activeMonth,
    activeYear,
  );
  console.log('appointments', appointments);
  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm shadow-lg">
        <div className="rounded-t bg-white p-5 dark:bg-gray-800 md:p-8">
          <div className="flex items-center justify-between px-4">
            <ActiveMonth month={activeMonth} year={activeYear} />
            <div className="flex items-center">
              <PreviousMonthArrow month={activeMonth} />
              <NextMonthArrow month={activeMonth} />
            </div>
          </div>
          <div className="flex items-center justify-between overflow-x-auto pt-12">
            <table className="w-full">
              <TableHead />
              <tbody>
                <TableBody
                  activeDay={activeDay}
                  activeMonth={activeMonth}
                  activeYear={activeYear}
                />
              </tbody>
            </table>
          </div>
        </div>

        <ActiveDayAppointments appointments={appointments}>
          <BookAppointmentButton
            date={formatBookDate(activeDay, activeMonth, activeYear)}
          />
        </ActiveDayAppointments>
      </div>
    </div>
  );
}

function formatBookDate(
  activeDay: number,
  activeMonth: number,
  activeYear: number,
) {
  return `${activeYear}-${activeMonth}-${activeDay}`;
}
