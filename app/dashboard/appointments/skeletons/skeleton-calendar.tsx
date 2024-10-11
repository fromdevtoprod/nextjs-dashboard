'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

export function SkeletonCalendar() {
  const t = useTranslations('Appointments');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  return (
    <div className="mb-8 grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('calendar')}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            numberOfMonths={2}
          />
        </CardContent>
      </Card>
    </div>
  );
}
