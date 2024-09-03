import { UserCircleIcon } from '@heroicons/react/24/outline';
import Input from './input';

export default function NameInput({
  errors,
  isDisabled = false,
  label = 'Enter a name',
  placeholder = 'Enter a name',
  value = '',
}: {
  errors: string[];
  isDisabled?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
}) {
  return (
    <Input
      errors={errors}
      icon={
        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      }
      id="name"
      isDisabled={isDisabled}
      label={label}
      placeholder={placeholder}
      value={value}
    />
  );
}
