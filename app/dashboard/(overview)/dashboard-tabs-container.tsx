import { fetchAllAppointmentsByDate } from '@/app/lib/data/appointments';
import { auth } from '@/auth';
import { DashboardTabs } from './dashboard-tabs';

export async function DashboardTabsContainer() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }
  const [upcomingAppointments] = await fetchDashboardTabsData(
    session.user.email,
  );
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
