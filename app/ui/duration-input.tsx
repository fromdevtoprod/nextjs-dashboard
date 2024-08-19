import { ClockIcon } from '@heroicons/react/24/outline';

export default function DurationInput({
  errors,
  value = 0,
}: {
  errors: string[];
  value?: number;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="duration" className="mb-2 block text-sm font-medium">
        Enter a duration
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id="duration"
            name="duration"
            type="number"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="duration-error"
            defaultValue={value}
          />
          <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
      <div id="duration-error" aria-live="polite" aria-atomic="true">
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
