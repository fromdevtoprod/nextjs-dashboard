import { ClickableDaySlot } from './clickable-day-slot';

export function DaySlot({
  day,
  activeMonth,
  activeYear,
  isActive,
}: {
  day: number;
  activeMonth: number;
  activeYear: number;
  isActive?: boolean;
}) {
  if (isActive) return <ActiveDaySlot day={day} />;
  if (isWeekend(day, activeMonth, activeYear)) return <WeekendSlot day={day} />;
  return <ClickableDaySlot day={day} />;
}

function isWeekend(day: number, month: number, year: number): boolean {
  return new Date(year, month, day).getDay() === 0;
}

function ActiveDaySlot({ day }: { day: number }) {
  return (
    <div className="h-full w-full">
      <div className="flex w-full cursor-not-allowed items-center justify-center rounded-full">
        <a
          role="link"
          tabIndex={0}
          className="flex  h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-base font-medium text-white hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
        >
          {day}
        </a>
      </div>
    </div>
  );
}

function WeekendSlot({ day }: { day: number }) {
  return (
    <div className="flex w-full cursor-not-allowed justify-center px-2 py-2">
      <p className="text-base text-gray-400 dark:text-gray-100">{day}</p>
    </div>
  );
}
