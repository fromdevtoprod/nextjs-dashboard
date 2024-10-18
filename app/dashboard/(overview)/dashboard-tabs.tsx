'use client';

import { useTranslations } from 'next-intl';
import { Clock, HandHeart, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Appointment } from '@/src/entities/models/appointment';

type DashboardTabsProps = {
  upcomingAppointments: Appointment[];
  recentActivities: any[];
};

export function DashboardTabs({
  recentActivities,
  upcomingAppointments,
}: DashboardTabsProps) {
  const t = useTranslations('Dashboard');
  return (
    <Tabs defaultValue="upcoming" className="mt-8">
      <TabsList>
        <TabsTrigger value="upcoming">{t('upcomingAppointments')}</TabsTrigger>
        {/* <TabsTrigger value="recent">Recent Activities</TabsTrigger> */}
      </TabsList>
      <TabsContent value="upcoming">
        <Card>
          <CardHeader>
            <CardTitle>{t('upcomingAppointments')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-24 text-sm text-[#2C3E50]">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {new Date(appointment.date).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      <p className="text-sm font-medium text-[#2C3E50]">
                        {appointment.customer?.name}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <HandHeart className="mr-1 h-4 w-4" />
                      <p className="text-sm text-[#7C9885]">
                        {appointment.appointmentType?.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      {/* <TabsContent value="recent">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Session completed',
                  client: 'David Brown',
                  time: '1 hour ago',
                },
                {
                  action: 'Note added',
                  client: 'Eva Davis',
                  time: '3 hours ago',
                },
                {
                  action: 'Appointment rescheduled',
                  client: 'Frank Wilson',
                  time: 'Yesterday',
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-40 text-sm text-[#2C3E50]">
                    {activity.action}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-[#2C3E50]">
                      {activity.client}
                    </p>
                    <p className="text-sm text-[#7C9885]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent> */}
    </Tabs>
  );
}
