import { useState } from 'react';

export default function TimeField({
  defaultValue = '',
}: {
  defaultValue?: string;
}) {
  const [time, setTime] = useState(defaultValue);

  const updateTime = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTime(e.target.value);

  return (
    <input
      id="time"
      name="time"
      type="time"
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
      aria-describedby="time-error"
      value={time}
      onChange={updateTime}
    />
  );
}
