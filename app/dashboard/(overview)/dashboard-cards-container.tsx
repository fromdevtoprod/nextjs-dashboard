import {
  countAllAppointments,
  countAllUpcomingAppointments,
} from '@/app/lib/data/appointments';
import { countNewCustomers } from '@/app/lib/data/customers';
import { countCompletedSessions } from '@/app/lib/data/packages';
import { DashboardCards } from './dashboard-cards';

type DashboardCardsContainerProps = {
  userEmail: string;
};

export async function DashboardCardsContainer({
  userEmail,
}: DashboardCardsContainerProps) {
  const [
    totalAppointmentsCount,
    upcomingAppointmentsCount,
    completedSessionsCount,
    newCustomersCount,
  ] = await fetchDashboardCardsCounters(userEmail);
  return (
    <DashboardCards
      completedSessionsCount={completedSessionsCount}
      newCustomersCount={newCustomersCount}
      totalAppointmentsCount={totalAppointmentsCount}
      upcomingAppointmentsCount={upcomingAppointmentsCount}
    />
  );
}

async function fetchDashboardCardsCounters(userEmail: string) {
  return Promise.all([
    countAllAppointments(userEmail),
    countAllUpcomingAppointments(userEmail),
    countCompletedSessions(userEmail),
    countNewCustomers(userEmail),
  ]);
}
