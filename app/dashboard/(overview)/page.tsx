import { DashboardHeader } from './dashboard-header';
import { DashboardCardsContainer } from './dashboard-cards-container';
import { DashboardTabsContainer } from './dashboard-tabs-container';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <DashboardHeader username={session?.user?.name || ''} />
      <DashboardCardsContainer userEmail={session.user.email} />
      <DashboardTabsContainer userEmail={session.user.email} />
    </main>
  );
}
