import { useTranslations } from 'next-intl';

export function DashboardHeader() {
  const t = useTranslations('Dashboard');
  return (
    <div className="mb-8 md:flex-row md:items-center">
      <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
        {t('title', { name: 'Johanna' })}
      </h1>
      <p className="text-[#2C3E50]">{t('subtitle')}</p>
    </div>
  );
}
