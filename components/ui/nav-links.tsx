'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <ul className="mt-4">
      {[
        { icon: BarChart2, label: 'Overview', value: 'overview' },
        {
          icon: CalendarDays,
          label: 'Appointments',
          value: 'appointments',
        },
        { icon: HandHeart, label: 'Cares', value: 'cares' },
        { icon: Users, label: 'Clients', value: 'clients' },
        { icon: History, label: 'History', value: 'history' },
        { icon: Package, label: 'Packages', value: 'packages' },
        { icon: Clipboard, label: 'Reports', value: 'reports' },
        { icon: Settings, label: 'Settings', value: 'settings' },
      ].map((item) => (
        <li key={item.value}>
          <Button
            variant="ghost"
            className={`w-full justify-start px-4 py-2 ${
              activeTab === item.value
                ? 'bg-[#7C9885] text-white'
                : 'text-[#2C3E50] hover:bg-[#F8F4E3]'
            }`}
            onClick={() => setActiveTab(item.value)}
          >
            <item.icon className="mr-2 h-5 w-5" />
            <Link
              href={`/${
                item.value === 'overview'
                  ? 'dashboard'
                  : 'dashboard/' + item.value
              }`}
            >
              {item.label}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
