import { useTranslations } from 'next-intl';

export function HistoryHeader() {
  const t = useTranslations('History');
  return (
    <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
      {t('title')}
    </h1>
  );
}
