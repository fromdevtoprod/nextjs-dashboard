import {
  countAllAppointments,
  countAllUpcomingAppointments,
} from '@/app/lib/data/appointments';
import { countNewCustomers } from '@/app/lib/data/customers';
import { countCompletedSessions } from '@/app/lib/data/packages';
import { DashboardCards } from './dashboard-cards';

export async function DashboardCardsContainer() {
  const [
    completedSessionsCount,
    newCustomersCount,
    totalAppointmentsCount,
    upcomingAppointmentsCount,
  ] = await fetchDashboardCardsCounters();
  return (
    <DashboardCards
      completedSessionsCount={completedSessionsCount}
      newCustomersCount={newCustomersCount}
      totalAppointmentsCount={totalAppointmentsCount}
      upcomingAppointmentsCount={upcomingAppointmentsCount}
    />
  );
}

async function fetchDashboardCardsCounters() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return Promise.all([
    countCompletedSessions(),
    countNewCustomers(),
    countAllAppointments(),
    countAllUpcomingAppointments(),
  ]);
}
