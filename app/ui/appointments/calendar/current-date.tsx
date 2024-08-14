function getDate() {
  const date = new Date();
  const month = getFrenchMonthName(date);
  const year = getYear(date);
  return `${month} ${year}`;
}

function getFrenchMonthName(date: Date) {
  const month = date.toLocaleString('fr-FR', { month: 'long' });
  return month.charAt(0).toUpperCase() + month.slice(1);
}

function getYear(date: Date) {
  return date.getFullYear();
}

export default function CurrentDate() {
  return (
    <span
      tabIndex={0}
      className="text-base  font-bold text-gray-800 focus:outline-none dark:text-gray-100"
    >
      {getDate()}
    </span>
  );
}
