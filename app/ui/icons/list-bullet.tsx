import clsx from 'clsx';
import { ListBulletIcon } from '@heroicons/react/24/outline';

export function MyListBulletIcon({
  additionalClassName,
}: {
  additionalClassName?: string;
}) {
  return (
    <ListBulletIcon
      className={clsx(
        'pointer-events-none h-[18px] w-[18px] text-gray-500',
        additionalClassName,
      )}
    />
  );
}
