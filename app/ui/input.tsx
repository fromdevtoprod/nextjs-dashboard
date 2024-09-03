export default function Input({
  errors,
  icon,
  id,
  isDisabled = false,
  label = 'Enter a name',
  placeholder,
  type = 'text',
  value = '',
}: {
  errors: string[];
  icon?: any;
  id: string;
  isDisabled?: boolean;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email';
  value?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder || label}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby={`${id}-error`}
            defaultValue={value}
            disabled={isDisabled}
          />
          {icon}
        </div>
      </div>
      <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
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
