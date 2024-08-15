import Row from './row';

export default function OtherRows({
  countEmptySlots,
  daysCount,
  month,
  year,
}: {
  countEmptySlots: number;
  daysCount: number;
  month: number;
  year: number;
}) {
  const totalSlots = getTotalDays(month, year) + countEmptySlots;
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
            month={month}
            year={year}
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
