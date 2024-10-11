'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SkeletonTabs() {
  const t = useTranslations('Appointments');
  return (
    <Tabs defaultValue="upcoming" className="mt-8">
      <TabsList>
        <TabsTrigger value="upcoming">{t('upcomingAppointments')}</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <Card>
          <CardHeader>
            <CardTitle>{t('upcomingAppointments')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div
                  key={`skeleton-tabs-div-${index}`}
                  className="flex items-center"
                >
                  <div className="w-16 text-sm text-[#2C3E50]">
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <div className="ml-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-2 h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
