import { AtSymbolIcon } from '@heroicons/react/24/outline';
import Input from './input';

export default function EmailInput({
  errors,
  isDisabled = false,
  label = 'Enter an email',
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
        <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      }
      id="email"
      isDisabled={isDisabled}
      label={label}
      placeholder="email@company.com"
      type="email"
      value={value}
    />
  );
}
