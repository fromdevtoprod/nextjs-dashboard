'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  BarChart2,
  CalendarDays,
  Clipboard,
  HandHeart,
  History,
  Package,
  Settings,
  Users,
} from 'lucide-react';

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="mt-4">
      {[
        {
          href: '/dashboard',
          icon: BarChart2,
          label: 'Overview',
          value: 'overview',
        },
        {
          href: '/dashboard/appointments',
          icon: CalendarDays,
          label: 'Appointments',
          value: 'appointments',
        },
        {
          href: '/dashboard/cares',
          icon: HandHeart,
          label: 'Cares',
          value: 'cares',
        },
        {
          href: '/dashboard/clients',
          icon: Users,
          label: 'Clients',
          value: 'clients',
        },
        {
          href: '/dashboard/history',
          icon: History,
          label: 'History',
          value: 'history',
        },
        {
          href: '/dashboard/packages',
          icon: Package,
          label: 'Packages',
          value: 'packages',
        },
        {
          href: '/dashboard/reports',
          icon: Clipboard,
          label: 'Reports',
          value: 'reports',
        },
        {
          href: '/dashboard/settings',
          icon: Settings,
          label: 'Settings',
          value: 'settings',
        },
      ].map((item) => (
        <li key={item.value}>
          <Button
            variant="ghost"
            className={`w-full justify-start px-4 py-2 ${
              pathname === item.href
                ? 'bg-[#7C9885] text-white'
                : 'text-[#2C3E50] hover:bg-[#F8F4E3]'
            }`}
          >
            <item.icon className="mr-2 h-5 w-5" />
            <Link href={item.href}>{item.label}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
