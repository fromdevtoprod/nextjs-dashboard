'use client';

import { CalendarDays, Heart, Users, Clipboard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DashboardCardsProps = {
  completedSessionsCount: number;
  newCustomersCount: number;
  totalAppointmentsCount: number;
  upcomingAppointmentsCount: number;
};

export function DashboardCards({
  completedSessionsCount,
  newCustomersCount,
  totalAppointmentsCount,
  upcomingAppointmentsCount,
}: DashboardCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: 'Total Appointments (last 365 days)',
          value: totalAppointmentsCount,
          icon: CalendarDays,
        },
        {
          title: 'Total Upcoming Appointments',
          value: upcomingAppointmentsCount,
          icon: Heart,
        },
        {
          title: 'New Clients (last 30 days)',
          value: newCustomersCount,
          icon: Users,
        },
        {
          title: 'Completed Sessions (last 30 days)',
          value: completedSessionsCount,
          icon: Clipboard,
        },
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
