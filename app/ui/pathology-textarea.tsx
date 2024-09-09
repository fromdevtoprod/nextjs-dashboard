import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function PathologyTextarea({
  errors,
  isDisabled = false,
  label = 'Enter pathology details',
  value,
}: {
  errors: string[];
  isDisabled?: boolean;
  label?: string;
  value?: string;
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor="pathology" className="mb-2 block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <textarea
            id="pathology"
            name="pathology"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="pathology-error"
            defaultValue={value}
            disabled={isDisabled}
          />
          <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
      <div id="pathology-error" aria-live="polite" aria-atomic="true">
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
