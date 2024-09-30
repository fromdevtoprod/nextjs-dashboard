import { fetchAllAppointmentsByDate } from '@/app/lib/data/appointments';
import { DashboardTabs } from './dashboard-tabs';

export async function DashboardTabsContainer() {
  const [upcomingAppointments] = await fetchDashboardTabsData();
  return (
    <DashboardTabs
      recentActivities={[]}
      upcomingAppointments={upcomingAppointments}
    />
  );
}

async function fetchDashboardTabsData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return Promise.all([
    fetchAllAppointmentsByDate(
      getCurrentDay(),
      getCurrentMonth(),
      getCurrentYear(),
    ),
  ]);
}

const getCurrentDay = () => new Date().getDate();

const getCurrentMonth = () => new Date().getMonth() + 1;

const getCurrentYear = () => new Date().getFullYear();
