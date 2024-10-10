import { NavMenu } from '@/components/ui/nav-menu';

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F8F4E3]">
      <NavMenu />

      {/* Main content area */}
      {children}
    </div>
  );
}
