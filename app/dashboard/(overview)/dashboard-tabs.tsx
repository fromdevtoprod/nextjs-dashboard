'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DashboardTabs() {
  return (
    <Tabs defaultValue="upcoming" className="mt-8">
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
        <TabsTrigger value="recent">Recent Activities</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: '10:00 AM',
                  client: 'Alice Johnson',
                  type: 'Therapy Session',
                },
                {
                  time: '11:30 AM',
                  client: 'Bob Smith',
                  type: 'Initial Consultation',
                },
                {
                  time: '2:00 PM',
                  client: 'Carol Williams',
                  type: 'Follow-up',
                },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 text-sm text-[#2C3E50]">
                    {appointment.time}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-[#2C3E50]">
                      {appointment.client}
                    </p>
                    <p className="text-sm text-[#7C9885]">{appointment.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="recent">
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
      </TabsContent>
    </Tabs>
  );
}
