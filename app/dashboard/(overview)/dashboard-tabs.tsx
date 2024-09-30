'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UpcomingAppointment } from '@/src/entities/models/appointment';

type DashboardTabsProps = {
  upcomingAppointments: UpcomingAppointment[];
  recentActivities: any[];
};

export function DashboardTabs({
  recentActivities,
  upcomingAppointments,
}: DashboardTabsProps) {
  console.log('upcomingAppointments', upcomingAppointments);
  return (
    <Tabs defaultValue="upcoming" className="mt-8">
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
        {/* <TabsTrigger value="recent">Recent Activities</TabsTrigger> */}
      </TabsList>
      <TabsContent value="upcoming">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 text-sm text-[#2C3E50]">
                    {appointment.time}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-[#2C3E50]">
                      {appointment.client_name}
                    </p>
                    <p className="text-sm text-[#7C9885]">
                      {appointment.appointment_type_name}
                    </p>
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
