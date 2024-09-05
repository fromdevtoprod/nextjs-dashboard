import { Rows } from './rows';

export async function TableBody({
  activeDay,
  activeMonth,
  activeYear,
}: {
  activeDay: number;
  activeMonth: number;
  activeYear: number;
}) {
  return (
    <Rows
      activeDay={activeDay}
      activeMonth={activeMonth}
      activeYear={activeYear}
    />
  );
}
