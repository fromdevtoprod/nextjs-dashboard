'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LeftArrow from '@/app/ui/left-arrow';

export default function PreviousMonth({ month }: { month: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const goToPreviousMonth = () => {
    const params = new URLSearchParams(searchParams || {});
    params.set('month', `${month - 1}`);
    replace(`${pathname}?${params.toString()}`);
  };

  return <LeftArrow isDisabled={month <= 0} onClick={goToPreviousMonth} />;
}
