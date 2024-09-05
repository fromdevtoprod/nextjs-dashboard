import { TimeField } from './time-field';
import { MyClockIcon } from './icons/clock';

export function TimeInput({
  errors,
  value,
}: {
  errors: string[];
  value?: string;
}) {
  return (
    <div className="mb-4">
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <TimeField value={value} />
          <MyClockIcon additionalClassName="absolute left-3 top-1/2 -translate-y-1/2" />
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
