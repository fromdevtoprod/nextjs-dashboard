import { useTranslations } from 'next-intl';

type DashboardHeaderProps = {
  username: string;
};

export function DashboardHeader({ username }: DashboardHeaderProps) {
  const t = useTranslations('Dashboard');
  return (
    <div className="mb-8 md:flex-row md:items-center">
      <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
        {t('title', { name: username })}
      </h1>
      <p className="text-[#2C3E50]">{t('subtitle')}</p>
    </div>
  );
}
