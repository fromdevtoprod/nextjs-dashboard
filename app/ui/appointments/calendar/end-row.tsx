import Row from './row';

export default function EndRow({
  countEmptySlots,
  daysCount,
  activeDay,
  activeMonth,
  activeYear,
}: {
  countEmptySlots: number;
  daysCount: number;
  activeDay: number;
  activeMonth: number;
  activeYear: number;
}) {
  const totalSlots = getTotalDays(activeMonth, activeYear) + countEmptySlots;
  const totalRows = getTotalRows(totalSlots);
  const firstRowDays = 7 - countEmptySlots;
  return (
    <>
      {Array.from({ length: totalRows - 1 }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          <Row
            rowIndex={rowIndex}
            firstRowDays={firstRowDays}
            daysCount={daysCount}
            activeDay={activeDay}
            activeMonth={activeMonth}
            activeYear={activeYear}
          />
        </tr>
      ))}
    </>
  );
}
function getTotalRows(totalSlots: number): number {
  return Math.ceil(totalSlots / 7);
}

function getTotalDays(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}
