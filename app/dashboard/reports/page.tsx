'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CalendarDays,
  Heart,
  Users,
  Clipboard,
  BarChart2,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  Clock,
} from 'lucide-react';

// Mock data for charts
const appointmentData = [
  { month: 'Jan', appointments: 45 },
  { month: 'Feb', appointments: 52 },
  { month: 'Mar', appointments: 61 },
  { month: 'Apr', appointments: 58 },
  { month: 'May', appointments: 63 },
  { month: 'Jun', appointments: 70 },
];

const revenueData = [
  { month: 'Jan', revenue: 5000 },
  { month: 'Feb', revenue: 5500 },
  { month: 'Mar', revenue: 6200 },
  { month: 'Apr', revenue: 5800 },
  { month: 'May', revenue: 6500 },
  { month: 'Jun', revenue: 7000 },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('overview');

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <h1 className="mb-8 text-3xl font-bold text-[#2C3E50]">Reports</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Appointments
                </CardTitle>
                <CalendarDays className="h-4 w-4 text-[#7C9885]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">349</div>
                <p className="text-xs text-[#7C9885]">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-[#7C9885]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$36,000</div>
                <p className="text-xs text-[#7C9885]">+15.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Clients
                </CardTitle>
                <Users className="h-4 w-4 text-[#7C9885]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">27</div>
                <p className="text-xs text-[#7C9885]">+10.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Session Duration
                </CardTitle>
                <Clock className="h-4 w-4 text-[#7C9885]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52 min</div>
                <p className="text-xs text-[#7C9885]">-2 min from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  {/* Placeholder for appointment trend chart */}
                  <div className="flex h-full w-full items-center justify-center rounded-md bg-[#F8F4E3] text-[#2C3E50]">
                    Appointment Trend Chart
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  {/* Placeholder for revenue trend chart */}
                  <div className="flex h-full w-full items-center justify-center rounded-md bg-[#F8F4E3] text-[#2C3E50]">
                    Revenue Trend Chart
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Statistics</CardTitle>
              <CardDescription>
                Detailed view of appointment data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {/* Placeholder for detailed appointment chart */}
                <div className="flex h-full w-full items-center justify-center rounded-md bg-[#F8F4E3] text-[#2C3E50]">
                  Detailed Appointment Chart
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>
                Breakdown of revenue sources and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {/* Placeholder for revenue analysis chart */}
                <div className="flex h-full w-full items-center justify-center rounded-md bg-[#F8F4E3] text-[#2C3E50]">
                  Revenue Analysis Chart
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Demographics</CardTitle>
              <CardDescription>
                Overview of client base characteristics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {/* Placeholder for client demographics chart */}
                <div className="flex h-full w-full items-center justify-center rounded-md bg-[#F8F4E3] text-[#2C3E50]">
                  Client Demographics Chart
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
