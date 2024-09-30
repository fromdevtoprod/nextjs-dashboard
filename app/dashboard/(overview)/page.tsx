import { DashboardHeader } from './dashboard-header';
import { DashboardCardsContainer } from './dashboard-cards-container';
import { DashboardTabsContainer } from './dashboard-tabs-container';

export default async function Page() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <DashboardHeader />
      <DashboardCardsContainer />
      <DashboardTabsContainer />
    </main>
  );
}
