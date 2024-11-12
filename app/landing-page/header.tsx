import Link from 'next/link';
import { CalendarHeart } from 'lucide-react';

export function Header() {
  return (
    <header className="flex h-16 items-center bg-white px-4 shadow-sm lg:px-6">
      <Link className="flex items-center justify-center" href="#">
        <CalendarHeart className="h-6 w-6 text-[#7C9885]" />
        <span className="ml-2 text-2xl font-bold text-[#7C9885]">
          ZenAgenda
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:text-[#7C9885]"
          href="#pricing"
        >
          Tarif
        </Link>
        <Link className="text-sm font-medium hover:text-[#7C9885]" href="#demo">
          Demo
        </Link>
        <Link className="text-sm font-medium hover:text-[#7C9885]" href="#">
          Contact
        </Link>
      </nav>
    </header>
  );
}
