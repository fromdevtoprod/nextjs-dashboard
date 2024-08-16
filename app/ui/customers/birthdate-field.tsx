import { useState } from 'react';

export default function BirthDateField({
  defaultValue = '',
}: {
  defaultValue: string;
}) {
  const [birthDate, setBirthDate] = useState(defaultValue);

  const updateBirthDate = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBirthDate(formatBirthDate(e.target.value));

  const formatBirthDate = (date: string) =>
    date.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');

  return (
    <input
      id="birth_date"
      name="birth_date"
      type="text"
      placeholder="DD/MM/YYYY"
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
      aria-describedby="birth_date-error"
      value={birthDate}
      onChange={updateBirthDate}
    />
  );
}
