import { wait } from '@/app/lib/utils';
import FirstRow from './first-row';
import OtherRows from './other-rows';

export default async function TableBody({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  await wait();
  const firstDay = getFirstDayOfMonth(month, year);
  const daysCount = countDaysInMonth(month, year);

  console.log('firstDay', firstDay);
  console.log('daysCount', daysCount);

  if (firstDay === 1) {
    return (
      <tbody>
        <FirstRow countEmptySlots={0} month={month} year={year} />
        <OtherRows
          countEmptySlots={0}
          daysCount={daysCount}
          month={month}
          year={year}
        />
      </tbody>
    );
  }

  const countEmptySlots = countEmptySlot(firstDay);
  return (
    <tbody>
      <FirstRow countEmptySlots={countEmptySlots} month={month} year={year} />
      <OtherRows
        countEmptySlots={countEmptySlots}
        daysCount={daysCount}
        month={month}
        year={year}
      />
    </tbody>
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
