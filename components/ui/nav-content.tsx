'use client';

import Link from 'next/link';
import {
  CalendarDays,
  Heart,
  Users,
  Clipboard,
  BarChart2,
  Settings,
  LogOut,
  Package,
  Menu,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function NavMenu() {
  return (
    <>
      {/* Desktop navigation */}
      <nav className="hidden w-64 bg-white shadow-md md:block">
        <NavContent />
      </nav>

      {/* Mobile navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-50 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <NavContent className="h-full" />
        </SheetContent>
      </Sheet>
    </>
  );
}

function NavContent({ className = '' }) {
  return (
    <div className={className}>
      <div className="p-4">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-[#7C9885]" />
          <span className="text-2xl font-bold text-[#7C9885]">
            CareSchedule
          </span>
        </Link>
      </div>
      {/* <div className="px-4 py-2">
        <Input placeholder="Search..." className="w-full" />
      </div> */}
      <ul className="mt-4">
        {[
          { icon: BarChart2, label: 'Overview', href: '/dashboard' },
          {
            icon: CalendarDays,
            label: 'Appointments',
            href: '/dashboard/appointments',
          },
          { icon: Heart, label: 'Cares', href: '/dashboard/cares' },
          { icon: Users, label: 'Clients', href: '/dashboard/clients' },
          { icon: CalendarDays, label: 'History', href: '/dashboard/history' },
          { icon: Package, label: 'Packages', href: '/dashboard/packages' },
          { icon: DollarSign, label: 'Payments', href: '/dashboard/payments' },
          { icon: Clipboard, label: 'Reports', href: '/dashboard/reports' },
          { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
        ].map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-2 ${
                  item.href === '/packages-in-progress'
                    ? 'bg-[#7C9885] text-white'
                    : 'text-[#2C3E50] hover:bg-[#F8F4E3]'
                }`}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-4 left-4 right-4">
        <Button variant="outline" className="justify-start text-[#2C3E50]">
          <LogOut className="mr-2 h-5 w-5" />
          Log out
        </Button>
      </div>
    </div>
  );
}
