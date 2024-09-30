import {
  countAllAppointments,
  countAllUpcomingAppointments,
} from '@/app/lib/data/appointments';
import { countNewCustomers } from '@/app/lib/data/customers';
import { countCompletedSessions } from '@/app/lib/data/packages';
import { DashboardHeader } from './dashboard-header';
import { DashboardCards } from './dashboard-cards';
import { DashboardTabs } from './dashboard-tabs';

export default async function Page() {
  const completedSessionsCount = await countCompletedSessions();
  const newCustomersCount = await countNewCustomers();
  const totalAppointmentsCount = await countAllAppointments();
  const upcomingAppointmentsCount = await countAllUpcomingAppointments();
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <DashboardHeader />
      <DashboardCards
        completedSessionsCount={completedSessionsCount}
        newCustomersCount={newCustomersCount}
        totalAppointmentsCount={totalAppointmentsCount}
        upcomingAppointmentsCount={upcomingAppointmentsCount}
      />
      <DashboardTabs />
    </main>
  );
}
