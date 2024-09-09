import { PhoneIcon } from '@heroicons/react/24/outline';
import Input from './input';

export default function PhoneInput({
  errors,
  isDisabled = false,
  label = 'Enter a phone number',
  value = '',
}: {
  errors: string[];
  isDisabled?: boolean;
  label?: string;
  value?: string;
}) {
  return (
    <Input
      errors={errors}
      icon={
        <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      }
      id="phone"
      isDisabled={isDisabled}
      label={label}
      placeholder="0607080910"
      value={value}
    />
  );
}
