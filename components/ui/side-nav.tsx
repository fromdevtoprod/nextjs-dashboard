import Link from 'next/link';
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, LogOut } from 'lucide-react';
import { NavLinks } from './nav-links';

export function SideNav() {
  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-4">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-[#7C9885]" />
          <span className="text-2xl font-bold text-[#7C9885]">
            CareSchedule
          </span>
        </Link>
      </div>
      <div className="px-4 py-2">
        <Input placeholder="Search..." className="w-full" />
      </div>
      <NavLinks />
      <div className="absolute bottom-4 left-4">
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <Button
            variant="outline"
            className="w-full justify-start text-[#2C3E50]"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        </form>
      </div>
    </nav>
  );
}
