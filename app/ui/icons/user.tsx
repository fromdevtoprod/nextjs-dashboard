import clsx from 'clsx';
import { UserIcon } from '@heroicons/react/24/outline';

export function MyUserIcon({
  additionalClassName,
}: {
  additionalClassName?: string;
}) {
  return (
    <UserIcon
      className={clsx(
        'pointer-events-none h-[18px] w-[18px] text-gray-500',
        additionalClassName,
      )}
    />
  );
}
