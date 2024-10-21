import { fetchAllAppointmentsByDate } from '@/app/lib/data/appointments';
import { DashboardTabs } from './dashboard-tabs';

type DashboardTabsContainerProps = {
  userEmail: string;
};

export async function DashboardTabsContainer({
  userEmail,
}: DashboardTabsContainerProps) {
  const [upcomingAppointments] = await fetchDashboardTabsData(userEmail);
  return (
    <DashboardTabs
      recentActivities={[]}
      upcomingAppointments={upcomingAppointments}
    />
  );
}

async function fetchDashboardTabsData(userEmail: string) {
  return Promise.all([
    fetchAllAppointmentsByDate(
      {
        day: getCurrentDay(),
        month: getCurrentMonth(),
        year: getCurrentYear(),
      },
      userEmail,
    ),
  ]);
}

const getCurrentDay = () => new Date().getDate();

const getCurrentMonth = () => new Date().getMonth() + 1;

const getCurrentYear = () => new Date().getFullYear();
