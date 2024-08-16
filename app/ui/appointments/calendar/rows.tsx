import EndRow from './end-row';
import StartRow from './start-row';

export default function Rows({
  activeDay,
  activeMonth,
  activeYear,
}: {
  activeDay: number;
  activeMonth: number;
  activeYear: number;
}) {
  const firstDay = getFirstDayOfMonth(activeMonth, activeYear);
  const daysCount = countDaysInMonth(activeMonth, activeYear);

  if (firstDay === 1) {
    return (
      <>
        <StartRow
          countEmptySlots={0}
          activeDay={activeDay}
          activeMonth={activeMonth}
          activeYear={activeYear}
        />
        <EndRow
          countEmptySlots={0}
          daysCount={daysCount}
          activeDay={activeDay}
          activeMonth={activeMonth}
          activeYear={activeYear}
        />
      </>
    );
  }

  const countEmptySlots = countEmptySlot(firstDay);
  return (
    <>
      <StartRow
        countEmptySlots={countEmptySlots}
        activeDay={activeDay}
        activeMonth={activeMonth}
        activeYear={activeYear}
      />
      <EndRow
        countEmptySlots={countEmptySlots}
        daysCount={daysCount}
        activeDay={activeDay}
        activeMonth={activeMonth}
        activeYear={activeYear}
      />
    </>
  );
}

function countDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function countEmptySlot(firstDay: number): number {
  if (firstDay === 0) return 6;
  return firstDay - 1;
}

function getFirstDayOfMonth(month: number, year: number): number {
  return new Date(year, month, 1).getDay();
}
