'use client';

import { CalendarDays, Heart, Users, Clipboard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DashboardCardsProps = {
  countCompletedSessions: number;
  newCustomersCount: number;
  upcomingAppointmentsCount: number;
};

export function DashboardCards({
  countCompletedSessions,
  newCustomersCount,
  upcomingAppointmentsCount,
}: DashboardCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: 'Total Appointments',
          value: upcomingAppointmentsCount,
          icon: CalendarDays,
        },
        { title: 'New Clients', value: newCustomersCount, icon: Users },
        {
          title: 'Completed Sessions',
          value: countCompletedSessions,
          icon: Clipboard,
        },
        { title: 'Upcoming Breaks', value: '2', icon: Heart },
      ].map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#2C3E50]">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-[#7C9885]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2C3E50]">
              {item.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
