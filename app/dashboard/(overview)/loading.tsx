import { DashboardHeader } from './dashboard-header';
import { SkeletonCards } from './skeleton/skeleton-cards';
import { SkeletonTabs } from './skeleton/skeleton-tabs';

export default function OverviewLoadingSkeleton() {
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <DashboardHeader />
      <SkeletonCards />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SkeletonTabs />
      </div>
    </main>
  );
}
