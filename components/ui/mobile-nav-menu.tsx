'use client';

import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function MobileNavMenu({ children }: { children: React.ReactNode }) {
  const t = useTranslations('NavMenu');
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-50 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">{t('toggle')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        {children}
      </SheetContent>
    </Sheet>
  );
}
