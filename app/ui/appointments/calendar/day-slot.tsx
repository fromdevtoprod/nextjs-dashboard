export default function DaySlot({
  day,
  month,
  year,
  isActive,
}: {
  day: number;

  month: number;
  year: number;
  isActive?: boolean;
}) {
  if (isActive) return <ActiveDaySlot day={day} />;
  if (isWeekend(day, month, year)) return <WeekendSlot day={day} />;
  return <ClassicDaySlot day={day} />;
}

function isWeekend(day: number, month: number, year: number): boolean {
  return new Date(year, month, day).getDay() === 0;
}

function ActiveDaySlot({ day }: { day: number }) {
  return (
    <div className="h-full w-full">
      <div className="flex w-full cursor-pointer items-center justify-center rounded-full">
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

function ClassicDaySlot({ day }: { day: number }) {
  return (
    <div className="flex w-full cursor-pointer justify-center px-2 py-2">
      <p className="text-base font-medium text-gray-700 dark:text-gray-100">
        {day}
      </p>
    </div>
  );
}
