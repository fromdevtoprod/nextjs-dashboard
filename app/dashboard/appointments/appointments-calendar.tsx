'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

export function AppointmentsCalendar() {
  const t = useTranslations('Appointments');

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
        <CardTitle>{t('calendar')}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          // className="rounded-md border"
          numberOfMonths={2}
        />
      </CardContent>
    </Card>
  );
}
