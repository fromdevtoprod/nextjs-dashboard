import { SideNav } from '@/components/ui/side-nav';

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F8F4E3]">
      <SideNav />

      {/* Main content area */}
      {children}
    </div>
  );
}
