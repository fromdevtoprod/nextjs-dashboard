import { countAllUpcomingAppointments } from '@/app/lib/data/appointments';
import { DashboardHeader } from './dashboard-header';
import { DashboardCards } from './dashboard-cards';
import { DashboardTabs } from './dashboard-tabs';
import { countNewCustomers } from '@/app/lib/data/customers';

export default async function Page() {
  const upcomingAppointmentsCount = await countAllUpcomingAppointments();
  const newCustomersCount = await countNewCustomers();
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <DashboardHeader />
      <DashboardCards
        newCustomersCount={newCustomersCount}
        upcomingAppointmentsCount={upcomingAppointmentsCount}
      />
      <DashboardTabs />
    </main>
  );
}
