import { ClockIcon } from '@heroicons/react/24/outline';
import TimeField from './time-field';

export default function TimeInput({
  errors,
  value,
}: {
  errors: string[];
  value?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="time" className="mb-2 block text-sm font-medium">
        Enter a time
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <TimeField defaultValue={value} />
          <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
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
