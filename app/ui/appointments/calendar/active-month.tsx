export default function ActiveMonth({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  return (
    <span
      tabIndex={0}
      className="text-base  font-bold text-gray-800 focus:outline-none dark:text-gray-100"
    >
      {getDate(month - 1, year)}
    </span>
  );
}

function getDate(month: number, year: number) {
  const date = new Date(year, month);
  return `${getMonthName(date)} ${getYear(date)}`;
}

function getMonthName(date: Date) {
  const month = date.toLocaleString('en-US', { month: 'long' });
  return month.charAt(0).toUpperCase() + month.slice(1);
}

function getYear(date: Date) {
  return date.getFullYear();
}
