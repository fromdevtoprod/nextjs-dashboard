import DaySlot from './day-slot';
import EmptySlot from './empty-slot';

export default function Row({
  rowIndex,
  firstRowDays,
  daysCount,
}: {
  rowIndex: number;
  firstRowDays: number;
  daysCount: number;
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
            <DaySlot day={day} />
          </td>
        );
      })}
    </>
  );
}
