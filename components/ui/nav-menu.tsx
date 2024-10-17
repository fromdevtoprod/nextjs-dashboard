import { signOut } from '@/auth';
import { NavLinks } from './nav-links';
import { MobileNavMenu } from './mobile-nav-menu';

export function NavMenu() {
  return (
    <form
      style={{ display: 'contents' }}
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <>
        {/* Desktop navigation */}
        <nav className="hidden w-64 bg-white shadow-md md:block">
          <NavLinks />
        </nav>

        {/* Mobile navigation */}
        <MobileNavMenu>
          <NavLinks className="h-full" />
        </MobileNavMenu>
      </>
    </form>
  );
}
