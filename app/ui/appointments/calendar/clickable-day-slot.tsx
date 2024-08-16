'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ClickableDaySlot({ day }: { day: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const changeActiveDay = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('day', `${day}`);
    replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div
      className="flex w-full cursor-pointer justify-center px-2 py-2"
      onClick={changeActiveDay}
    >
      <p className="text-base font-medium text-gray-700 dark:text-gray-100">
        {day}
      </p>
    </div>
  );
}
