import { useTranslations } from 'next-intl';

type PaymentStatusBadgeProps = { status: string };

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const t = useTranslations('Payments');
  if (!status) return null;

  switch (status) {
    case 'paid':
      return (
        <span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          {t('status.paid')}
        </span>
      );
    case 'pending':
      return (
        <span className="me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          {t('status.pending')}
        </span>
      );
    default:
      return null;
  }
}
