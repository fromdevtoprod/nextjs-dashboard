import { CakeIcon } from '@heroicons/react/24/outline';
import BirthDateField from './customers/birthdate-field';

export default function BirthDateInput({
  errors,
  isDisabled = false,
  label = 'Enter a birth date',
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
        <label htmlFor="birth_date" className="mb-2 block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <BirthDateField defaultValue={value} isDisabled={isDisabled} />
          <CakeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
      <div id="birth_date-error" aria-live="polite" aria-atomic="true">
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
