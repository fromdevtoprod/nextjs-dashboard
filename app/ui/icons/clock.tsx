import clsx from 'clsx';
import { ClockIcon } from '@heroicons/react/24/outline';

export function MyClockIcon({
  additionalClassName,
}: {
  additionalClassName?: string;
}) {
  return (
    <ClockIcon
      className={clsx(
        'pointer-events-none h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900',
        additionalClassName,
      )}
    />
  );
}
