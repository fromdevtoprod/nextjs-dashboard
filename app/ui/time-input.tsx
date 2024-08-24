import { useState } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { TimeField } from './time-field';

export default function TimeInput({
  careDuration,
  errors,
}: {
  careDuration: number;
  errors: string[];
}) {
  const [time, setTime] = useState('00:00');
  let endTime = '';

  if (time !== '00:00' && isTimeWellFormatted(time) && careDuration > 0) {
    endTime = calculateEndTime(time, careDuration);
  }

  return (
    <div className="mb-4">
      <label htmlFor="time" className="mb-2 block text-sm font-medium">
        Enter a time
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <TimeField onChange={setTime} />
          <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {endTime && `Estimated end: ${endTime} minutes`}
      </div>

      <div id="time-error" aria-live="polite" aria-atomic="true">
        {errors &&
          errors.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  );
}

function calculateEndTime(startTime: string, duration: number) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const start = new Date();
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start.getTime() + duration * 60000);
  return end.toTimeString().split(' ')[0];
}

function isTimeWellFormatted(time: string) {
  return /^[0-9]{2}:[0-9]{2}$/.test(time);
}
