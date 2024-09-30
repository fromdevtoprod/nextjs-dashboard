'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SkeletonTabs() {
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
              {[...Array(3)].map((index) => (
                <div
                  key={`skeleton-tabs-div-${index}`}
                  className="flex items-center"
                >
                  <div className="w-16 text-sm text-[#2C3E50]">
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-[#2C3E50]">
                      <Skeleton className="h-4 w-32" />
                    </p>
                    <p className="text-sm text-[#7C9885]">
                      <Skeleton className="mt-2 h-4 w-32" />
                    </p>
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
