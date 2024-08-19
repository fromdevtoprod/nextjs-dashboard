import { CakeIcon } from '@heroicons/react/24/outline';
import Input from './input';
import BirthDateField from './customers/birthdate-field';

export default function BirthDateInput({
  errors,
  value,
}: {
  errors: string[];
  value?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="birth_date" className="mb-2 block text-sm font-medium">
        Enter a birth date
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <BirthDateField defaultValue={value} />
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
