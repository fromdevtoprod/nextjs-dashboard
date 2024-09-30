import { countAllUpcomingAppointments } from '@/app/lib/data/appointments';
import { DashboardHeader } from './dashboard-header';
import { DashboardCards } from './dashboard-cards';
import { DashboardTabs } from './dashboard-tabs';

export default async function Page() {
  const upcomingAppointmentsCount = await countAllUpcomingAppointments();
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <DashboardHeader />
      <DashboardCards upcomingAppointmentsCount={upcomingAppointmentsCount} />
      <DashboardTabs />
    </main>
  );
}
