'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

export function AppointmentsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (date) {
      const newSearchParams = new URLSearchParams(searchParams || {});
      newSearchParams.set('day', `${date.getDate()}`);
      newSearchParams.set('month', `${date.getMonth() + 1}`);
      newSearchParams.set('year', `${date.getFullYear()}`);
      replace(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [date]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}
