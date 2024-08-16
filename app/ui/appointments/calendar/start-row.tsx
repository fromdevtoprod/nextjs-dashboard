import DaySlot from './day-slot';
import EmptySlot from './empty-slot';

export default function StartRow({
  countEmptySlots,
  activeDay,
  activeMonth,
  activeYear,
}: {
  countEmptySlots: number;
  activeDay: number;
  activeMonth: number;
  activeYear: number;
}) {
  return (
    <tr>
      {Array.from({ length: 7 }).map((_, index) => {
        if (index < countEmptySlots) {
          return (
            <td key={index} className="pt-6">
              <EmptySlot />
            </td>
          );
        }
        const day = index + 1 - countEmptySlots;
        return (
          <td key={index} className="pt-6">
            <DaySlot
              isActive={activeDay === day}
              day={day}
              activeMonth={activeMonth}
              activeYear={activeYear}
            />
          </td>
        );
      })}
    </tr>
  );
}
