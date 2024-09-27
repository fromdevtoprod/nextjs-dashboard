'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

export function AppointmentsCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (selectedDate) {
      const newSearchParams = new URLSearchParams(searchParams || {});
      newSearchParams.set('day', `${selectedDate.getDate()}`);
      newSearchParams.set('month', `${selectedDate.getMonth() + 1}`);
      newSearchParams.set('year', `${selectedDate.getFullYear()}`);
      replace(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [selectedDate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}
