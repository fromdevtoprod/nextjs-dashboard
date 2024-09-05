import clsx from 'clsx';
import { HandRaisedIcon } from '@heroicons/react/24/outline';

export function MyHandRaisedIcon({
  additionalClassName,
}: {
  additionalClassName?: string;
}) {
  return (
    <HandRaisedIcon
      className={clsx(
        'pointer-events-none h-[18px] w-[18px] text-gray-500',
        additionalClassName,
      )}
    />
  );
}
