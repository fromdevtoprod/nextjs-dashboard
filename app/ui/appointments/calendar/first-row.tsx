import DaySlot from './day-slot';
import EmptySlot from './empty-slot';

export default function FirstRow({
  countEmptySlots,
}: {
  countEmptySlots: number;
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
        return (
          <td key={index} className="pt-6">
            <DaySlot day={index + 1 - countEmptySlots} />
          </td>
        );
      })}
    </tr>
  );
}
