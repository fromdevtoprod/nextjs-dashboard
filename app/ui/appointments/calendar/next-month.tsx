'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import RightArrow from '@/app/ui/right-arrow';

export default function PreviousMonth({ month }: { month: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const goToNextMonth = () => {
    // @ts-ignore
    const params = new URLSearchParams(searchParams || {});
    params.set('month', `${month + 1}`);
    replace(`${pathname}?${params.toString()}`);
  };

  return <RightArrow isDisabled={month >= 11} onClick={goToNextMonth} />;
}
