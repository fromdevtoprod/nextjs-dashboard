import { SkeletonCalendar } from './skeletons/skeleton-calendar';
import { SkeletonHeader } from './skeletons/skeleton-header';
import { SkeletonUpcomingAppointments } from './skeletons/skeleton-upcoming-appointments';

export default function AppointmentsLoadingSkeleton() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <SkeletonHeader />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 w-[32rem]">
          <SkeletonCalendar />
        </div>

        <div className="col-span-4">
          <SkeletonUpcomingAppointments />
        </div>
      </div>
    </main>
  );
}
