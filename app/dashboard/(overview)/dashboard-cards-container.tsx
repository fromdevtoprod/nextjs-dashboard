import {
  countAllAppointments,
  countAllUpcomingAppointments,
} from '@/app/lib/data/appointments';
import { countNewCustomers } from '@/app/lib/data/customers';
import { countCompletedSessions } from '@/app/lib/data/packages';
import { DashboardCards } from './dashboard-cards';

export async function DashboardCardsContainer() {
  const [
    totalAppointmentsCount,
    upcomingAppointmentsCount,
    completedSessionsCount,
    newCustomersCount,
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
  return Promise.all([
    countAllAppointments(),
    countAllUpcomingAppointments(),
    countCompletedSessions(),
    countNewCustomers(),
  ]);
}
