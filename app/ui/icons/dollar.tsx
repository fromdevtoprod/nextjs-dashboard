import clsx from 'clsx';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

export function MyDollarIcon({
  additionalClassName,
}: {
  additionalClassName?: string;
}) {
  return (
    <CurrencyDollarIcon
      className={clsx(
        'pointer-events-none h-[18px] w-[18px] text-gray-500',
        additionalClassName,
      )}
    />
  );
}
