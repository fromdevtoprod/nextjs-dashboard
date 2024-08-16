import DaySlot from './day-slot';
import EmptySlot from './empty-slot';

export default function Row({
  rowIndex,
  firstRowDays,
  daysCount,
  activeDay,
  activeMonth,
  activeYear,
}: {
  rowIndex: number;
  firstRowDays: number;
  daysCount: number;
  activeDay: number;
  activeMonth: number;
  activeYear: number;
}) {
  return (
    <>
      {Array.from({ length: 7 }).map((_, dayIndex) => {
        const day = firstRowDays + dayIndex + 1 + rowIndex * 7;
        if (day > daysCount) {
          return (
            <td key={dayIndex}>
              <EmptySlot />
            </td>
          );
        }
        return (
          <td key={dayIndex}>
            <DaySlot
              isActive={activeDay === day}
              day={day}
              activeMonth={activeMonth}
              activeYear={activeYear}
            />
          </td>
        );
      })}
    </>
  );
}
