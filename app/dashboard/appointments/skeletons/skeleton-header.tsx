import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function SkeletonHeader() {
  const t = useTranslations('Appointments');
  return (
    <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
      <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
        {t('appointments')}
      </h1>

      <Button
        className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
        disabled={true}
      >
        <CalendarPlus className="mr-2 h-5 w-5" />
        {t('addAppointment')}
      </Button>
    </div>
  );
}
